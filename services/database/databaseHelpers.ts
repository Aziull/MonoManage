import { Database } from "expo-sqlite";
import { BaseModel } from "./entities";

export const executeSqlAsync = (db: Database, sql: string, params: any[] = []): Promise<any> =>
    new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(sql, params,
                (_, result) => resolve(result),
                (_, error) => {
                    reject(error);
                    return true; // To stop transaction
                });
        });
    });

export const insertOrUpdate = async (db: Database, table: string, data: { [key: string]: any }, condition?: string) => {
    let keys = Object.keys(data);
    let values = Object.values(data);

    let sql;
    if (condition) {
        let setString = keys.map((key) => `${key} = ?`).join(', ');
        sql = `UPDATE ${table} SET ${setString} WHERE ${condition}`;
    } else {
        let placeholders = keys.map(() => '?').join(', ');
        sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
    }

    return executeSqlAsync(db, sql, values);
};

export const selectAll = async (db: Database, table: string, condition: string = '1=1') => {
    let sql = `SELECT * FROM ${table} WHERE ${condition}`;
    return executeSqlAsync(db, sql);
};

export const deleteRow = async (db: Database, table: string, condition: string) => {
    let sql = `DELETE FROM ${table} WHERE ${condition}`;
    return executeSqlAsync(db, sql);
};