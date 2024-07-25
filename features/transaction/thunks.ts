import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { BankAccountTransactionsRequestArgs, Transaction } from './types';
import { Transaction as TransactionEntity } from '../../services/database/entities';
import { TransactionModel } from '../../services/database';
import { transactionApi } from './api';
import { mapToEntity, mapToModel } from './lib';

// Припустимо, що transaction має тип Transaction
export const getTransactionsAsync = createAsyncThunk(
    'transaction/getAllTransactionAsync',
    async (_, { rejectWithValue }) => {
        try {
            // Додавання транзакції в базу даних
            const transactions: TransactionEntity[] = await TransactionModel.selectAll()
            // Повертаємо транзакцію для оновлення стану Redux, якщо успішно
            return transactions.map(mapToModel);
        } catch (error) {
            // У випадку помилки повертаємо відхилене значення
            return rejectWithValue(error);
        }
    }
);


// Припустимо, що transaction має тип Transaction
export const addTransactionAsync = createAsyncThunk(
    'transaction/addTransactionAsync',
    async (transaction: Transaction, { rejectWithValue }) => {
        try {
            // Додавання транзакції в базу даних
            await TransactionModel.insertOrUpdate(mapToEntity(transaction))
            const tt = await TransactionModel.selectAll()            
            // Повертаємо транзакцію для оновлення стану Redux, якщо успішно
            return transaction;
        } catch (error) {
            // У випадку помилки повертаємо відхилене значення
            return rejectWithValue(error);
        }
    }
);

// Припустимо, що transaction має тип Transaction
export const addBankTransactionsAsync = createAsyncThunk(
    'transaction/addBankTransactionsAsync',
    async (args: BankAccountTransactionsRequestArgs, { dispatch, rejectWithValue }) => {
        try {
            const transactions = await dispatch(transactionApi.endpoints.getBankAccountTransactions.initiate(args)).unwrap();

            if (!transactions) return isRejectedWithValue('No data in response');
            // Додавання транзакції в базу даних
            await TransactionModel.insertOrUpdateMultiple(transactions, (item: Transaction) => `id = '${item.id}'`)
            // Повертаємо транзакцію для оновлення стану Redux, якщ о успішно
            return transactions.map(mapToModel);
        } catch (error) {
            // У випадку помилки повертаємо відхилене значення
            return rejectWithValue(error);
        }
    }
);

// Припустимо, що transaction має тип Transaction
export const toggleIgnoreTransactionAsyncs = createAsyncThunk(
    'transaction/toggleIgnoreTransactionAsyncs',
    async (transaction: Transaction, { rejectWithValue }) => {
        try {
            // Додавання транзакції в базу даних
            await TransactionModel.insertOrUpdate({ ...transaction, deleted: !transaction.deleted }, `id = '${transaction.id}'`)
            // Повертаємо транзакцію для оновлення стану Redux, якщо успішно
            return { id: transaction.id, newDeleted: transaction.deleted };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
