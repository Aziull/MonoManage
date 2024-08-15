import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { BankAccountTransactionsRequestArgs, BankAccountTransactionsRequestArgs2, Transaction } from './types';
import { Transaction as TransactionEntity } from '../../services/database/entities';
import { TransactionModel } from '../../services/database';
import { transactionApi } from './api';
import { mapToEntity, mapToModel } from './lib';
import { getBankApiUrl } from '../api/config';
import axios from 'axios'
import { transactionRepository } from '../../db';
// Припустимо, що transaction має тип Transaction
export const getTransactionsAsync = createAsyncThunk(
    'transaction/getAllTransactionAsync',
    async (_, { rejectWithValue }) => {
        try {
            const transactions: TransactionEntity[] = await transactionRepository.getAll();
            return transactions.map(mapToModel);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAllTransactionsByAccounts = createAsyncThunk(
    'getAllByAccounts',
    async (accountIds: string[]) => {
        return await transactionRepository.getAllByAccounts(accountIds);
    }
)

const fetchTransactionsFromAPI = async (accountId: string, token: string) => {
    try {
        const response = await axios.get(`https://api.example.com/accounts/${accountId}/transactions`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching transactions for account ${accountId}`, error);
        return [];
    }
};

export const ba = createAsyncThunk(
    'ba',
    async ({ from, to, accounts, bankName, requestPath }: BankAccountTransactionsRequestArgs2, { rejectWithValue }) => {
        try {

            const res = await Promise.all(
                accounts.map(({ id, lastSync }) => {
                    const fromDate = lastSync > from ? lastSync : from;
                    return fetch(`${getBankApiUrl(bankName, requestPath)}/${id}/${fromDate}/${to}`)
                })
            )
            const data = await Promise.all(res.map(r => r.json()))
            console.log(data.flat());
        } catch (error) {
            rejectWithValue(error)
        }
    }
)


export const addTransactionAsync = createAsyncThunk(
    'transaction/addTransactionAsync',
    async (transaction: Omit<Transaction, 'id'>, { rejectWithValue }) => {
        try {
            const created = await transactionRepository.create(transaction)
            if (!created) throw Error('Could not create transaction');
            return created;

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateTransactionsInDb = createAsyncThunk(
    'transaction/updateInDb',
    async (transactions: Transaction[], { rejectWithValue }) => {
        try {
            if (!transactions) return rejectWithValue('No data in response');
            await TransactionModel.insertOrUpdateMultiple(transactions, (item: Transaction) => `id = '${item.id}'`)
            return transactions.map(mapToModel);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const addBankTransactionsAsync = createAsyncThunk(
    'transaction/addBankTransactionsAsync',
    async (args: BankAccountTransactionsRequestArgs, { dispatch, rejectWithValue }) => {
        try {
            const transactions = await dispatch(transactionApi.endpoints.getBankAccountTransactions.initiate(args)).unwrap();

            if (!transactions) throw Error('No data in response');
            await TransactionModel.insertOrUpdateMultiple(transactions, (item: Transaction) => `id = '${item.id}'`)
            return transactions.map(mapToModel);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
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
