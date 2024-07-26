import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCashAccount, getAccounts, updateAccountInDb } from "./thunks";
import { Account } from "./types";
import Helper from "../../helper";

type StateType = {
    accounts: Account[]
    loading: boolean,
    error: null | string | object | unknown,
}

const initState: StateType = {
    accounts: [],
    loading: false,
    error: null,
};

const accountsSlice = createSlice({
    name: 'account',
    initialState: initState,
    reducers: {
        updateAccounts: (state, { payload: accounts }: PayloadAction<Account[]>) => {
            accounts.forEach(transaction => {
                const predicate = (item: Account) => item.id === transaction.id;
                state.accounts = Helper.Array.upsert(state.accounts, transaction, predicate);
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAccounts.fulfilled, (state, { payload }) => {
                state.accounts.push(...payload);
                state.loading = false;
            })
            .addCase(getAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCashAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCashAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCashAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts.push(action.payload);
            })
    },
})

export const { updateAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;