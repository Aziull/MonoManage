import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectAllAccounts = (state: RootState) => state.accounts.accounts;

export const selectCashAccounts = createSelector(
  [selectAllAccounts],
  (accounts) => accounts.filter(account => account.type === 'cash')
);

export const selectBankAccounts = createSelector(
  [selectAllAccounts],
  (accounts) => accounts.filter(account => account.type === 'bank')
);
