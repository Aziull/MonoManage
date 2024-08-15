import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapToModel } from "./lib";
import { RootState } from "../../store";
import { Account, CashAccountArgs } from "./types";
import { accountRepository } from "../../db";

export const getAccounts = createAsyncThunk(
    'account/getAccounts',
    async (_, { getState, rejectWithValue }) => {
        const { user } = (getState() as RootState).auth;
        if (!user) return rejectWithValue('User not exist');
        try {
            const accounts = await accountRepository.getAllByUser(user.id);
            if (!accounts) throw new Error('У цього користувача ще немає жодного рахунку');

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

        await accountRepository.upsertMany(
            accounts.map(account => ({
                ...account,
                userId: user.id,
                updatedAt: Date.now()
            }))
        )
    }
)

export const createCashAccount = createAsyncThunk(
    'accounts/createCashAccount',
    async ({ name, balance }: CashAccountArgs, { getState, rejectWithValue }) => {
        try {
            const { user } = (getState() as RootState).auth;
            if (!user) throw Error('No user');
            const newAccount = await accountRepository.create({
                userId: user.id,
                type: 'cash',
                balance,
                name,
            })
            if (!newAccount) throw Error('failed adding user to db');

            return newAccount;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)