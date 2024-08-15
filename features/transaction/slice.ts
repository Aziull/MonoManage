import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from './types';

import { addTransactionAsync, getTransactionsAsync, toggleIgnoreTransactionAsyncs, addBankTransactionsAsync, getAllTransactionsByAccounts } from './thunks';
import { RootState } from '../../store';
import { applyFilters } from '../../utils/filters/applyFilters';

type StateType = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null | string | object | unknown,
}

const transactionsAdapter = createEntityAdapter<Transaction>({
  sortComparer: (a, b) => b.time - a.time,
});

const initialState: EntityState<Transaction, string> & StateType = transactionsAdapter.getInitialState({
  status: 'idle',
  error: null,

},);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTrasnaction: (state, action) => {
      transactionsAdapter.addOne(state, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addBankTransactionsAsync.fulfilled, (state, { payload }: PayloadAction<Transaction[]>) => {
      transactionsAdapter.upsertMany(state, payload);
    })
      .addCase(getTransactionsAsync.fulfilled, transactionsAdapter.addMany)
      .addCase(addTransactionAsync.fulfilled, (state, { payload }) => {
        transactionsAdapter.updateOne(state, {
          id: payload.id,
          changes: payload
        })
      })
      .addCase(toggleIgnoreTransactionAsyncs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(toggleIgnoreTransactionAsyncs.fulfilled, (state, { payload }) => {
        const { id, newDeleted } = payload;
        state.status = 'idle'
        transactionsAdapter.updateOne(state, {
          id,
          changes: {
            ...payload,
            deleted: newDeleted
          }
        })
      })
      .addCase(getAllTransactionsByAccounts.fulfilled, transactionsAdapter.setAll)
  }
});

export const {
  selectAll: selectAllTransactions,
  selectById: selectTransactionById,
  selectIds: selectTransactuionsIds
} = transactionsAdapter.getSelectors((state: RootState) => state.transaction)

export const getTransactionsStatus = (state: RootState) => state.transaction.status;
export const getTransactionsError = (state: RootState) => state.transaction.error;

export const selectTrabsactionsByAccount = createSelector(
  [selectAllTransactions, (_, accountId) => accountId],
  (transactions, accountId) => transactions.filter(transaction => transaction.accountId === accountId)
)

export const selectDeletedTransactions = createSelector(
  [selectAllTransactions],
  (transactions) => transactions.filter(transaction => transaction.deleted)
);

export const selectNotDeletedTransactions = createSelector(
  [selectAllTransactions],
  (transactions) => transactions.filter(transaction => !transaction.deleted)
);

const selectFilters = (state: RootState) => state.filters;

export const selectFilteredTransactions = createSelector(
    [selectFilters, (state: RootState, deleted: boolean) => deleted ? selectDeletedTransactions(state) : selectNotDeletedTransactions(state)],
    (filters, transactions) => applyFilters(transactions, filters)
);


export const { addTrasnaction } = transactionSlice.actions;
export default transactionSlice.reducer;