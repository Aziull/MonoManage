import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createCashAccount, getAccounts, updateAccountInDb } from "./thunks";
import { Account } from "./types";
import Helper from "../../helper";
import { RootState } from "../../store";

type StateType = {
    loading: boolean,
    error: null | string | object | unknown,
}

const adapter = createEntityAdapter<Account>()

const initState: EntityState<Account, string> & StateType = adapter.getInitialState({
    loading: false,
    error: null,
});

const accountsSlice = createSlice({
    name: 'account',
    initialState: initState,
    reducers: {
        updateAccounts: (state, { payload: accounts }: PayloadAction<Account[]>) => {
            adapter.upsertMany(state, accounts);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAccounts.fulfilled, (state, { payload: accounts }) => {
                adapter.setAll(state, accounts);
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
                adapter.addOne(state, action.payload);
            })
    },
})

export const {
    selectAll: selectAllAccounts,
    selectById: selectAccountById,
    selectIds: selectAccountsIds
} = adapter.getSelectors((state: RootState) => state.accounts)

export const selectCashAccounts = createSelector(
    [selectAllAccounts],
    (accounts => accounts.filter(account => account.type === 'cash'))
)

export const selectBankAccounts = createSelector(
    [selectAllAccounts],
    (accounts => accounts.filter(account => account.type === 'bank'))
)

export const { updateAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;