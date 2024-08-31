import { createEntityAdapter, createSelector, createSlice, EntityState, isAnyOf } from '@reduxjs/toolkit';
import { Transaction } from './types';

import { RootState } from '../../store';
import { applyFilters } from '../../utils/filters/applyFilters';
import { transactionApi } from './api';
import { addTransactionAsync, getAllTransactionsByAccounts, toggleIgnoreTransactionAsyncs, updateTransaction, upsertAccountTransactions } from './thunks';

type StateType = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null | string | object | unknown,
  fetchedAccounts: number;
  processedAccounts: number,
}

const transactionsAdapter = createEntityAdapter<Transaction>({
  sortComparer: (a, b) => b.time - a.time,
});

const initialState: EntityState<Transaction, string> & StateType = transactionsAdapter.getInitialState({
  status: 'idle',
  fetchedAccounts: 0,
  processedAccounts: 0,
  error: null,

},);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTrasnaction: (state, action) => {
      transactionsAdapter.addOne(state, action.payload)
    },
    setFetchedAccountsCount: (state, {payload}) => {
      state.fetchedAccounts = payload;
    },
    resetProcessedAccounts: (state) => {
      state.processedAccounts = 0;
    },
    addProcessedAccount: (state) => {
      if (state.fetchedAccounts === state.processedAccounts) return;
      state.processedAccounts += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(upsertAccountTransactions.fulfilled, transactionsAdapter.upsertMany)
      .addCase(addTransactionAsync.fulfilled, transactionsAdapter.addOne)
      .addCase(toggleIgnoreTransactionAsyncs.fulfilled, (state, { payload }) => {
        const { id, newDeleted } = payload;
        transactionsAdapter.updateOne(state, {
          id,
          changes: {
            ...payload,
            deleted: newDeleted
          }
        })
      })
      .addCase(getAllTransactionsByAccounts.fulfilled, transactionsAdapter.setAll)
      .addCase(updateTransaction.fulfilled, (state, { payload }) => {
        const { id, ...transaction } = payload;
        transactionsAdapter.updateOne(state, {
          id,
          changes: {
            ...transaction
          }

        })
      })
      .addMatcher(
        isAnyOf(
          transactionApi.endpoints.getTransactions.matchPending,
          toggleIgnoreTransactionAsyncs.pending,
          updateTransaction.pending,
          upsertAccountTransactions.pending,
        ),
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        isAnyOf(
          upsertAccountTransactions.fulfilled,
          updateTransaction.fulfilled,
          getAllTransactionsByAccounts.fulfilled,
          toggleIgnoreTransactionAsyncs.fulfilled,
          addTransactionAsync.fulfilled,
          transactionApi.endpoints.getTransactions.matchRejected,
          transactionApi.endpoints.getTransactions.matchFulfilled,
        ),
        (state) => {
          state.status = 'idle';
        }
      )

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
  (filters, transactions) => {
    return applyFilters(transactions, filters)
  }
);


export const { addTrasnaction, resetProcessedAccounts, addProcessedAccount, setFetchedAccountsCount } = transactionSlice.actions;
export default transactionSlice.reducer;