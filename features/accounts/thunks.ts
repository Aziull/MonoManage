import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccountModel } from "../../services/database";
import { mapToModel } from "./lib";
import { Account as AccountEntity } from "../../services/database/entities";
import { RootState } from "../../store";

export const getAccounts = createAsyncThunk(
    'account/getAccounts',
    async (_, { getState, rejectWithValue }) => {
        const { user } = (getState() as RootState).auth;
        if (!user) return rejectWithValue('User not exist');
        try {
            const accounts: AccountEntity[] = await AccountModel.selectAll();

            return accounts.map(mapToModel);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)