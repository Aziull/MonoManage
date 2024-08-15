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
export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    const DATABASE_VERSION = 3;
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
                ${createUsersTable}
                ${createAccountsTable}
                ${createTransactionsTable}
                ${insertAdmin}
                ${insertAccount}
                `);
        } else
            if (currentDbVersion === 1) {
                db.execAsync(`
                ${createLastUpdateTable}
                ${addTransactionTableToLastUpdate}
                ${createTransactionTrigger}
                `);
            } else if (currentDbVersion === 2) {
                db.execAsync(addLastSyncField)
                console.log('done');
            } else if (currentDbVersion === 3) {

                await db.execAsync(`
                DROP TRIGGER IF EXISTS update_last_insert_time;
                DROP TABLE IF EXISTS LastUpdate;
            `);
                // Отримуємо список всіх таблиць
                const tables = await db.getAllAsync<{ name: string }>(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name != 'android_metadata';"
                );
                console.log(tables, 'tables');

                for (const table of tables) {
                    const tableName = table.name;

                    // Перевіряємо наявність стовпців createdAt та updatedAt
                    const columns = await db.getAllAsync<{ name: string }>(
                        `PRAGMA table_info(${tableName});`
                    );

                    const hasCreatedAt = columns.some(column => column.name === 'createdAt');
                    const hasUpdatedAt = columns.some(column => column.name === 'updatedAt');

                    // Додаємо стовпці createdAt та updatedAt, якщо вони не існують
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

                    // Оновлюємо існуючі рядки, щоб заповнити createdAt та updatedAt поточним часовим штампом
                    const currentTimestamp = Math.floor(Date.now() / 1000); // Поточний Unix timestamp
                    await db.execAsync(`
                    UPDATE ${tableName} SET createdAt = ${currentTimestamp} WHERE createdAt IS NULL;
                    UPDATE ${tableName} SET updatedAt = ${currentTimestamp} WHERE updatedAt IS NULL;
                `);

                    // Додаємо тригер для автоматичного оновлення поля updatedAt
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
        console.log(DATABASE_VERSION, 'DATABASE_VERSION');

        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch (error) {
        console.error('error while migration ', error);
    }

}