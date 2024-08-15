import { Account, BaseModel, Transaction, TransactionsFrequency, User } from "./entities";
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

    getAll(): Promise<T[]> {
        return db.getAllAsync(`SELECT * FROM ${this.tableName}`)
    }

    async create(item: Omit<T, 'id'>): Promise<T | null> {
        const itemWithId: T = {
            ...item,
            id: uuidv4()
        } as T;

        const keys = Object.keys(itemWithId).join(', ');
        const values = Object.values(itemWithId);
        const placeholders = values.map((_) => `?`).join(', ');

        const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`;
        const res = await db.getFirstAsync<T>(query, values);
        return res;
    }

    async getById(id: string): Promise<T | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const res = await db.getFirstAsync<T>(query, id);
        return res
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        const keys = Object.keys(item);
        const values = Object.values(item);
        const setClause = keys.map((key, i) => `${key} = ?`).join(', ');

        const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ? RETURNING *`;
        const res = await db.getFirstAsync<T>(query, [...values, id]);
        return res
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        await db.runAsync(query, id);
    }

    async upsert(item: T): Promise<T | null> {
        const existingItem = await this.getById(item.id);
        if (existingItem) {
            return this.update(item.id, item as Partial<T>);
        } else {
            return this.create(item);
        }
    }
}

export class UpsertManyRepository<T extends BaseModel> extends Repository<T> implements IUpsertManyRepository<T> {
    async upsertMany(items: T[]): Promise<T[]> {
        await db.runAsync('BEGIN TRANSACTION');
        try {
            const promises = items.map(item => this.upsert(item));
            const results = await Promise.all(promises);

            const isValid = results.every(result => result !== null);
            if (!isValid) {
                throw new Error('One or more upsert operations failed');
            }

            await db.runAsync('COMMIT');
            return results;
        } catch (error) {
            await db.runAsync('ROLLBACK');
            throw error;
        }
    }
}

export class AccountRepository extends UpsertManyRepository<Account> {
    async getAllByUser(userId: string): Promise<Account[] | null> {
        return await db.getAllAsync(`SELECT * FROM ${this.tableName} WHERE userId = ?`, userId)
    }
}

export class TransactionRepository extends UpsertManyRepository<Transaction> {
    async getAllByAccount(accountId: string) {
        return await db.getAllAsync(`SELECT * FROM ${this.tableName} WHERE accountId = ?`, accountId)
    }
    async getAllByAccounts(accountIds: string[]) {
        const placeholders = accountIds.map(() => '?').join(',');
        const query = `SELECT * FROM ${this.tableName} WHERE accountId IN (${placeholders})`;
        return await db.getAllAsync<Transaction>(query, accountIds);
    }
    async getAllSortedNames() {
        const query = `SELECT description, COUNT(description) as frequency 
        FROM transactions 
        GROUP BY description 
        ORDER BY frequency DESC`

        return await db.getAllAsync<TransactionsFrequency>(query)

    }
}