import { createSlice } from '@reduxjs/toolkit';
import { Transaction } from './types';
import { transactionApi } from './api';
import { addTransactionAsync, getTransactionsAsync, toggleIgnoreTransactionAsyncs, addBankTransactionsAsync } from './thunks';
import Helper from '../../helper';
import { TransactionModel } from '../../services/database';
type StateType = {
  transactions: Transaction[]
  ignoredTransactionIds: string[]
}

const initialState: StateType = {
  transactions: [],
  ignoredTransactionIds: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTrasnaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    addToIgnored: (state, action) => {
      state.ignoredTransactionIds.push(action.payload.transactuin.id);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addBankTransactionsAsync.fulfilled, (state, action) => {
      if (!Array.isArray(action.payload)) return
      action.payload.forEach(transaction => {
        const predicate = (item: Transaction) => item.id === transaction.id;
        state.transactions = Helper.Array.upsert(state.transactions, transaction, predicate);
      });
    });
    builder.addCase(getTransactionsAsync.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(addTransactionAsync.fulfilled, (state, action) => {
      const predicate = (item: Transaction) => item.id === action.payload.id;
      state.transactions = Helper.Array.upsert(state.transactions, action.payload, predicate);
    });
    builder.addCase(toggleIgnoreTransactionAsyncs.fulfilled, (state, action) => {
      const { id, newDeleted } = action.payload;
      const transaction = state.transactions.find(t => t.id === id);
      if (transaction) {
        transaction.deleted = newDeleted;
      }
    });
  }
});

export const { addTrasnaction, addToIgnored } = transactionSlice.actions;
export default transactionSlice.reducer;