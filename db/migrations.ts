import { SQLiteDatabase } from "expo-sqlite";
///1
const insertAdmin = `
INSERT INTO Users (id, name) VALUES ('admin', 'admin');
`;

const createUsersTable = `
CREATE TABLE IF NOT EXISTS Users (
  id TEXT PRIMARY KEY,
  name TEXT
);
`;


const createAccountsTable = `
CREATE TABLE IF NOT EXISTS Accounts (
  id TEXT PRIMARY KEY,
  name TEXT,
  balance REAL,
  userId TEXT,
  type TEXT,
  updatedAt INTEGER,
  FOREIGN KEY (userId) REFERENCES Users(id)
);
`;

// Додати адміністратора
const insertAccount = `
INSERT INTO Accounts (id, name, balance, userId, type) VALUES ('cash', 'Готівка', 0, 'admin', 'cash');
`;


const createTransactionsTable = `
CREATE TABLE IF NOT EXISTS Transactions (
  id TEXT PRIMARY KEY,
  amount REAL,
  balance REAL,
  cashbackAmount REAL,
  commissionRate REAL,
  currencyCode INTEGER,
  description TEXT,
  hold BOOLEAN,
  mcc INTEGER,
  operationAmount REAL,
  originalMcc INTEGER,
  receiptId TEXT,
  time INTEGER,
  accountId TEXT,
  deleted BOOLEAN,
  FOREIGN KEY (accountId) REFERENCES Accounts(id)
);
`;
/// 1 end
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

const addLastSyncField = 'ALTER TABLE Accounts ADD COLUMN lastSync TIMESTAMP DEFAULT NULL;'



const migrations = [
    {
        version: 1,
        migrate: async (db: SQLiteDatabase) => {
            await db.execAsync(`
                ${createUsersTable}
                ${createAccountsTable}
                ${createTransactionsTable}
                ${insertAdmin}
                ${insertAccount}
            `);
        }
    },
    {
        version: 2,
        migrate: async (db: SQLiteDatabase) => {
            await db.execAsync(`
                ${createLastUpdateTable}
                ${addTransactionTableToLastUpdate}
                ${createTransactionTrigger}
            `);
        }
    },
    {
        version: 3,
        migrate: async (db: SQLiteDatabase) => {
            await db.execAsync(addLastSyncField);
        }
    },
    {
        version: 4,
        migrate: async (db: SQLiteDatabase) => {
            await db.execAsync(`
                DROP TRIGGER IF EXISTS update_last_insert_time;
                DROP TABLE IF EXISTS LastUpdate;
            `);

            const tables = await db.getAllAsync<{ name: string }>(
                "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name != 'android_metadata';"
            );

            for (const table of tables) {
                const tableName = table.name;
                const columns = await db.getAllAsync<{ name: string }>(
                    `PRAGMA table_info(${tableName});`
                );

                const hasCreatedAt = columns.some(column => column.name === 'createdAt');
                const hasUpdatedAt = columns.some(column => column.name === 'updatedAt');

                if (!hasCreatedAt) {
                    await db.execAsync(`
                        ALTER TABLE ${tableName} ADD COLUMN createdAt INTEGER;
                    `);
                }
                if (!hasUpdatedAt) {
                    await db.execAsync(`
                        ALTER TABLE ${tableName} ADD COLUMN updatedAt INTEGER;
                    `);
                }

                const currentTimestamp = Math.floor(Date.now() / 1000);
                await db.execAsync(`
                    UPDATE ${tableName} SET createdAt = ${currentTimestamp} WHERE createdAt IS NULL;
                    UPDATE ${tableName} SET updatedAt = ${currentTimestamp} WHERE updatedAt IS NULL;
                `);

                await db.execAsync(`
                    CREATE TRIGGER IF NOT EXISTS ${tableName}_update_timestamp
                    AFTER UPDATE ON ${tableName}
                    BEGIN
                        UPDATE ${tableName} SET updatedAt = strftime('%s', 'now') WHERE id = NEW.id;
                    END;
                `);
            }

            console.log('Added createdAt and updatedAt columns with triggers');
        }
    },
    {
        version: 5,
        migrate: async (db: SQLiteDatabase) => {
            const tables = ['Users', 'Accounts', 'Transactions'];

            for (const table of tables) {
                console.log(`Перевірка дублікатів у таблиці ${table}`);

                const duplicatesQuery = `
                    SELECT id, COUNT(*) as count FROM ${table} GROUP BY id HAVING count > 1
                `;
                const duplicates = await db.getAllAsync<{ id: string; count: number }>(duplicatesQuery);

                for (const duplicate of duplicates) {
                    console.log(`Знайдено дублікат з id: ${duplicate.id}`);

                    const deleteQuery = `
                        DELETE FROM ${table}
                        WHERE id = ?
                        AND rowid NOT IN (
                            SELECT MIN(rowid) FROM ${table} WHERE id = ?
                        )
                    `;
                    await db.runAsync(deleteQuery, [duplicate.id, duplicate.id]);
                }
            }
            console.log('Дублікати видалено');
        }
    },
    {
        version: 6,
        migrate: async (db: SQLiteDatabase) => {
            const query = `ALTER TABLE Transactions ADD COLUMN comment TEXT DEFAULT NULL;`;
            db.execAsync(query);

            console.log('Додано поле комент до транзакції');
        }
    }
];
export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    // const res = await db.getAllAsync(`SELECT * FROM Transactions WHERE id='U2A-I14i9G5UHyxztg'`);
    // console.log(res);

    const targetVersion = migrations.length;
    try {
        const result = await db.getFirstAsync<{ user_version: number }>(
            'PRAGMA user_version'
        );
        if (!result) {
            throw new Error('user_version NOT FOUND');
        }

        let { user_version: currentDbVersion } = result;

        if (currentDbVersion >= targetVersion) {
            return;
        }
        for (const migration of migrations) {
            if (migration.version > currentDbVersion) {
                console.log(`Міграція до версії ${migration.version}`);
                await migration.migrate(db);
                await db.execAsync(`PRAGMA user_version = ${migration.version}`);
                console.log(`Міграція до версії ${migration.version} успішна`);
            }
        }

        console.log('Міграції завершені');
    } catch (error) {
        console.error('Помилка під час міграції: ', error);
    }
};