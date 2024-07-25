import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { BankRequestArgs } from "../../features/transaction/types";
import { AccountModel, UserModel } from "../../services/database";
import { RootState } from '../../store';
import { Account } from "./types";
import { Account as AccountEntity, User as UserEntity } from "../../services/database/entities";

// createAsyncThunk для отримання рахунків банку, зберігання їх у базі даних та оновлення стану Redux
export const fetchAndSaveBankAccounts = createAsyncThunk(
    'accounts/fetchAndSave',
    async (args: BankRequestArgs, { dispatch, getState }) => {
        const { user } = (getState() as RootState).auth;
        if (!user) return isRejectedWithValue('User not exist');

        try {
            const accounts = await dispatch(userApi.endpoints.getBankAccounts.initiate(args)).unwrap()
            if (!accounts) return isRejectedWithValue('No data in response');

            AccountModel.insertOrUpdateMultiple(
                accounts.map((account: Account): AccountEntity => ({ ...account, userId: user.id, type: "bank", updatedAt: Date.now() })),
                (account: AccountEntity) => `id = '${account.id}'`
            );

            return accounts;
        } catch (error) {
            console.log('error', error);

            return isRejectedWithValue('Error fetching data'); // Обробка помилки, якщо така виникає
        }
    }
);



export const getUserAsync = createAsyncThunk(
    'auth/getUserAsync',
    async (_, { }) => {
        const [user]: UserEntity[] = await UserModel.selectAll("id = 'admin'")
        return { user }
    }
)