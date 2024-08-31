import { Account, BaseModel, Transaction, TransactionsFrequency } from "./entities";
import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';

interface IRepository<T extends BaseModel> {
    create(item: T): Promise<T | null>;
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    update(id: string, item: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
    upsert(item: T): Promise<T | null>;
}

export interface IUpsertManyRepository<T extends BaseModel> {
    upsertMany(items: T[]): Promise<T[]>;
}

const db = SQLite.openDatabaseSync('appDatabase.db');

export class Repository<T extends BaseModel> implements IRepository<T> {
    protected tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async getAll(): Promise<T[]> {
        return db.getAllAsync(`SELECT * FROM ${this.tableName}`);
    }

    async create(item: Omit<T, 'id'>): Promise<T | null> {
        const itemWithId: T = {
            ...item,
            id: uuidv4()
        } as T;

        const keys = Object.keys(itemWithId).join(', ');
        const values = Object.values(itemWithId);
        const placeholders = values.map(() => `?`).join(', ');

        const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`;
        return await db.getFirstAsync<T>(query, values);
    }

    async getById(id: string): Promise<T | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        return await db.getFirstAsync<T>(query, [id]);
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        try {
            const keys = Object.keys(item);
            const values = Object.values(item);
            const setClause = keys.map((key) => `${key} = ?`).join(', ');

            const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ? RETURNING *`;
            return await db.getFirstAsync<T>(query, [...values, id]);
        } catch (error) {
            console.log(`Оновлення ${this.tableName} завершилось з помилкою: ${error}`);
            return null;
        }

    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        await db.runAsync(query, [id]);
    }

    async upsert(item: T): Promise<T | null> {
        const keys = Object.keys(item).join(', ');
        const values = Object.values(item);
        const placeholders = values.map(() => '?').join(', ');

        const query = `
            INSERT OR REPLACE INTO ${this.tableName} (${keys}) 
            VALUES (${placeholders}) 
            RETURNING *`;

        try {
            const result = await db.getFirstAsync<T>(query, values);
            return result;
        } catch (error) {
            console.error(`Помилка при виконанні upsert у таблиці ${this.tableName}:`, error);
            return null;
        }
    }
}

export class UpsertManyRepository<T extends BaseModel> extends Repository<T> implements IUpsertManyRepository<T> {
    async upsertMany(items: T[]): Promise<T[]> {
        try {
            await db.withExclusiveTransactionAsync(async (txn) => {
                for (const item of items) {
                    const keys = Object.keys(item);
                    const values = keys.map(key => item[key as keyof T]);
                    const placeholders = keys.map(() => '?').join(', ');

                    const updateFields = keys
                        .filter(key => key !== 'id')
                        .map(key => `${key} = excluded.${key}`)
                        .join(', ');

                    const query = `
                        INSERT INTO ${this.tableName} (${keys.join(', ')})
                        VALUES (${placeholders})
                        ON CONFLICT(id) DO UPDATE SET ${updateFields};
                    `;
                    await txn.runAsync(query, values as Array<any>);
                }
            });

            return items;
        } catch (error) {
            console.log(`Error during upsertMany in table ${this.tableName}:`, error);
            throw error;
        }
    }
}



export class AccountRepository extends UpsertManyRepository<Account> {
    async getAllByUser(userId: string): Promise<Account[] | null> {
        return await db.getAllAsync(`SELECT * FROM ${this.tableName} WHERE userId = ?`, [userId]);
    }
}

export class TransactionRepository extends UpsertManyRepository<Transaction> {
    async getAllByAccount(accountId: string) {
        return await db.getAllAsync(`SELECT * FROM ${this.tableName} WHERE accountId = ?`, [accountId]);
    }

    async getAllByAccounts(accountIds: string[]) {
        const placeholders = accountIds.map(() => '?').join(',');
        const query = `SELECT * FROM ${this.tableName} WHERE accountId IN (${placeholders})`;
        return await db.getAllAsync<Transaction>(query, accountIds);
    }

    async getAllSortedNames() {
        const query = `SELECT description, COUNT(description) as frequency 
        FROM ${this.tableName} 
        GROUP BY description 
        ORDER BY frequency DESC`;

        return await db.getAllAsync<TransactionsFrequency>(query);
    }
}
