import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { AccountModel } from "../../services/database";
import { mapToModel } from "./lib";
import { Account as AccountEntity } from "../../services/database/entities";
import { RootState } from "../../store";
import { Account, CashAccountArgs } from "./types";

export const getAccounts = createAsyncThunk(
    'account/getAccounts',
    async (_, { getState, rejectWithValue }) => {
        const { user } = (getState() as RootState).auth;
        if (!user) return rejectWithValue('User not exist');
        try {
            const accounts: AccountEntity[] = await AccountModel.selectAll(`userId = '${user.id}'`);

            return accounts.map(mapToModel);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const updateAccountInDb = createAsyncThunk(
    'accounts/updateInDb',
    async (accounts: Account[], { getState, rejectWithValue }) => {
        const { user } = (getState() as RootState).auth;
        if (!user) return rejectWithValue('User not exist');
        await AccountModel.insertOrUpdateMultiple(
            accounts.map((account: Account): AccountEntity => ({ ...account, userId: user.id, type: "bank", updatedAt: Date.now() })),
            (account: AccountEntity) => `id = '${account.id}'`
        );
    }
)

export const createCashAccount = createAsyncThunk(
    'accounts/createCashAccount',
    async ({ name, balance }: CashAccountArgs, { getState, rejectWithValue }) => {
        const { user } = (getState() as RootState).auth;
        if (!user) return rejectWithValue('No user');
        const newAccount = await AccountModel.insertOrUpdate({
            id: self.crypto.randomUUID(),
            userId: user.id,
            type: 'cash',
            balance,
            name,
        } as AccountEntity);

        if (!newAccount) rejectWithValue('failed adding user to db');
        return mapToModel(newAccount);
    }
)