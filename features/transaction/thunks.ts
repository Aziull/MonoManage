import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapToModel } from './lib';
import { Transaction } from './types';

import { accountRepository, transactionRepository } from '../../db';
import DateUtils from '../../utils/timeUtils';

export const getAllTransactionsByAccounts = createAsyncThunk(
    'getAllByAccounts',
    async (accountIds: string[], { rejectWithValue }) => {
        try {
            const inDb = await transactionRepository.getAllByAccounts(accountIds);
            return inDb.map(mapToModel)
        } catch (error) {
            return rejectWithValue('Error while fetching transactuions from DB');
        }
    }
)


export const addTransactionAsync = createAsyncThunk(
    'transaction/addTransactionAsync',
    async (transaction: Omit<Transaction, 'id'>, { rejectWithValue }) => {
        try {
            const created = await transactionRepository.create(transaction)
            console.log(created);

            if (!created) throw Error('Could not create transaction');
            return mapToModel(created);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateTransaction = createAsyncThunk(
    'transaction/update',
    async ({ id, transaction }: { transaction: Partial<Transaction>, id: string }, { rejectWithValue }) => {
        try {
            const fromDB = await transactionRepository.update(id, transaction);
            if (!fromDB) throw Error('Error while update transaction');
            return mapToModel(fromDB);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const upsertAccountTransactions = createAsyncThunk(
    'transaction/upsertMany',
    async (transactions: Transaction[], { rejectWithValue }) => {
        try {
            const inDbTransactions = await transactionRepository.upsertMany(transactions);

            if (inDbTransactions.length) await accountRepository.update(transactions[0].accountId, {
                lastSync: DateUtils.getCurrentUnixTime(),
            })

            return inDbTransactions.map(mapToModel);
        } catch (error) {
            return rejectWithValue({ message: "Помилка оновлення данних" });
        }
    }
);


export const toggleIgnoreTransactionAsyncs = createAsyncThunk(
    'transaction/toggleIgnoreTransactionAsyncs',
    async (transaction: Transaction, { rejectWithValue }) => {
        try {
            const newTransaction = await transactionRepository.update(transaction.id, { deleted: !transaction.deleted })
            if (!newTransaction) throw Error('update failed');

            return { id: newTransaction.id, newDeleted: !!newTransaction.deleted };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
