import * as SQLite from 'expo-sqlite';
import { Storage } from 'redux-persist';

const db = SQLite.openDatabase('reduxPersist.db');

export const executeSqlAsync = (sql: string, args: any[] = []): Promise<SQLite.SQLResultSet> =>
    new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                sql,
                args,
                (_, result) => resolve(result),
                (_, error) => {
                    reject(error);
                    return false; // To stop transaction
                }
            );
        });
    });

export const expoSQliteAdapter: Storage = {
    async getItem(key: string): Promise<string | null> {
        try {
            const result = await executeSqlAsync('SELECT value FROM store WHERE key = ?', [key]);
            if (result.rows.length > 0) {
                return result.rows.item(0).value;
            }
            return null; // Key not found
        } catch (error) {
            console.error('Error getting item with key:', key, error);
            throw error;
        }
    },

    async setItem(key: string, value: string): Promise<void> {
        try {
            await executeSqlAsync('INSERT OR REPLACE INTO store (key, value) VALUES (?, ?)', [key, value]);
        } catch (error) {
            console.error('Error setting item with key:', key, error);
            throw error;
        }
    },

    async removeItem(key: string): Promise<void> {
        try {
            await executeSqlAsync('DELETE FROM store WHERE key = ?', [key]);
        } catch (error) {
            console.error('Error removing item with key:', key, error);
            throw error;
        }
    }
};

// Ensure the store table exists
executeSqlAsync('CREATE TABLE IF NOT EXISTS store (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL)');
