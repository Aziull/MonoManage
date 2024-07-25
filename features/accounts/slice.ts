import { createSlice } from "@reduxjs/toolkit";
import { getAccounts } from "./thunks";
import { Account } from "./types";

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
    reducers: (create) => ({
        // addAccount: create.asyncThunk(
        //     async (id: )
        // )
    }),
    extraReducers: (builder) => {
        builder
            .addCase(getAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAccounts.fulfilled, (state, action) => {
                state.accounts = action.payload;                
                state.loading = false;
            })
            .addCase(getAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
})

export const { } = accountsSlice.actions;
export default accountsSlice.reducer;