import { Account, BaseModel, User } from "./entities";
import * as SQLite from 'expo-sqlite';

interface IRepository<T extends BaseModel> {
    create(item: T): Promise<T | null>;
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

    async create(item: Omit<T, 'id'>): Promise<T | null> {

        const itemWithId: T = {
            ...item,
            id: self.crypto.randomUUID() as string
        } as T;

        const keys = Object.keys(itemWithId).join(', ');
        const values = Object.values(itemWithId);
        const placeholders = values.map((_) => `?`).join(', ');

        const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`;
        const res = await db.getFirstAsync<T>(query, values);
        console.log('create', res)
        return res;
    }

    async getById(id: string): Promise<T | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const res = await db.getFirstAsync<T>(query, id);
        console.log('getById', res)
        return res
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        const keys = Object.keys(item);
        const values = Object.values(item);
        const setClause = keys.map((key, i) => `${key} = ?`).join(', ');

        const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ? RETURNING *`;
        const res = await db.getFirstAsync<T>(query, [...values, id]);
        console.log('read', res)
        return res
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        await db.runAsync(query, id);
    }

    async upsert(item: T): Promise<T | null> {
        const keys = Object.keys(item).join(', ');
        const values = Object.values(item);
        const placeholders = values.map((_) => `?`).join(', ');

        const updateClause = Object.keys(item)
            .map((key) => `${key} = EXCLUDED.${key}`)
            .join(', ');

        const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})
                       ON CONFLICT (id) DO UPDATE SET ${updateClause}
                       RETURNING *`;
        const rows = await db.getFirstAsync<T>(query, values);

        return rows;
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