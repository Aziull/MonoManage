import * as SQLite from 'expo-sqlite/legacy';
import { migrate } from './migrations';
import { createModel } from './models';
import { Account, Transaction, User } from './entities';

// Відкриття або створення бази даних
const db = SQLite.openDatabase('appDatabase.db');

export const initializeDatabase = async () => {
    try {
        // Виклик функції міграції для створення або оновлення таблиць
        migrate(db);
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};

// Створення екземплярів моделей зі строгою типізацією
export const UserModel = createModel<User>(db, 'Users');
export const AccountModel = createModel<Account>(db, 'Accounts');
export const TransactionModel = createModel<Transaction>(db, 'Transactions');

export default db;
