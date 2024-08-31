import { createEntityAdapter, createSelector, createSlice, EntityState, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createCashAccount, getAccounts, upsertAccountsAsync } from "./thunks";
import { Account } from "./types";

type StateType = {
    loading: boolean,
    error: null | string | object | unknown,
}

const adapter = createEntityAdapter<Account>({})

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
            .addCase(getAccounts.fulfilled, adapter.setAll)
            .addCase(createCashAccount.fulfilled, adapter.addOne)
            .addCase(upsertAccountsAsync.fulfilled, adapter.upsertMany)
            .addMatcher(
                isAnyOf(
                    upsertAccountsAsync.fulfilled,
                    createCashAccount.fulfilled,
                    getAccounts.fulfilled
                ),
                (state) => {
                    state.loading = false;
                }
            )
            .addMatcher(
                isAnyOf(
                    getAccounts.pending,
                    createCashAccount.pending,
                    upsertAccountsAsync.pending,
                ),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    getAccounts.rejected,
                    upsertAccountsAsync.rejected,
                    createCashAccount.rejected,
                ),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
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