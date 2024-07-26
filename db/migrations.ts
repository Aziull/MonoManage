import { SQLiteDatabase } from "expo-sqlite";

const createLastUpdateTable = `CREATE TABLE IF NOT EXISTS LastUpdate (
      id INTEGER PRIMARY KEY,
      tableName TEXT NOT NULL,
      lastInsertTime TIMESTAMP
    );`
const addTransactionTableToLastUpdate = `
    INSERT OR IGNORE INTO LastUpdate (tableName, lastInsertTime) VALUES ('Transactions', NULL);`

const createTransactionTrigger = `
    CREATE TRIGGER IF NOT EXISTS update_last_insert_time
    AFTER INSERT ON Transactions
    BEGIN
      UPDATE LastUpdate
      SET lastInsertTime = CURRENT_TIMESTAMP
      WHERE tableName = 'Transactions';
    END;`

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    const DATABASE_VERSION = 1;
    try {
        const result = await db.getFirstAsync<{ user_version: number }>(
            'PRAGMA user_version'
        );
        if (!result) {
            throw new Error('user_version NOT FOUND')
        }
        let { user_version: currentDbVersion } = result;

        if (currentDbVersion >= DATABASE_VERSION) {
            return;
        }
        
        if (currentDbVersion === 0) {
            db.execAsync(`
                ${createLastUpdateTable}
                ${addTransactionTableToLastUpdate}
                ${createTransactionTrigger}
                `);DATABASE_VERSION
        }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch (error) {
        console.error(error);
    }

}