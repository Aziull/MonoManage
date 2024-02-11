//features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { Account, User } from './types';
import { getAllAcoountsAsync, getUserAsync } from './thunks';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state: AuthState) => {
      state.user = null;
    },
    addBankAccounts: (state, action) => {
      if (state.user) {
        state.user.bankAccounts.push(action.payload)
      }
    },
  },
  extraReducers: (builder) => {

    builder.addCase(getAllAcoountsAsync.fulfilled, (state, action) => {
      const accounts = action.payload;
      if (typeof accounts === "boolean" || !state.user) return
      const bankAccounts = accounts.filter(e => e.type === "bank")
      const customAccounts = accounts.filter(e => e.type === "custom")
      state.user.bankAccounts = bankAccounts;
      state.user.accounts = customAccounts;
    });
    builder.addCase(getUserAsync.fulfilled, (state, action) => {

      const { user, accounts } = action.payload;

      const bankAccounts = accounts.filter(account => account.type === "bank")
      const customAccounts = accounts.filter(e => e.type === "custom")
      state.user = {
        id: user.id,
        name: user.name,
        bankAccounts,
        accounts: customAccounts
      }
    });
    // builder.addMatcher(
    //   userApi.endpoints.getBankAccounts.matchFulfilled,
    //   (state, { payload }) => {
    //     state.user?.bankAccounts.push(...payload);
    //   }
    // );
    builder.addMatcher(
      userApi.endpoints.getBankAccounts.matchRejected,
      (state, { payload }) => {
        state.error = payload?.status.toString();
      }
    );
  }
});

export const { createUser, logout, addBankAccounts } = authSlice.actions;

export default authSlice.reducer;