import { Database } from 'expo-sqlite';

const createUsersTable = `
CREATE TABLE IF NOT EXISTS Users (
  id TEXT PRIMARY KEY,
  name TEXT
);
`;

// Додати адміністратора
const insertAdmin = `
INSERT INTO Users (id, name) VALUES ('admin', 'admin');
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
INSERT INTO Accounts (id, name, balance, userId, type) VALUES ('cash', 'Готівка', 0, 'admin', 'custom');
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

const createIgnoredTransactionIdsTable = `
CREATE TABLE IF NOT EXISTS IgnoredTransactionIds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transactionId TEXT,
  userId INTEGER,
  FOREIGN KEY (transactionId) REFERENCES Transactions(id),
  FOREIGN KEY (userId) REFERENCES Users(id)
);
`;

const updateAccountsTableToAddUpdatedAt = `
ALTER TABLE Accounts ADD COLUMN updatedAt INTEGER;
`;

export const migrate = (db: Database) => {
  db.transaction(tx => {
    tx.executeSql(createUsersTable);
    tx.executeSql(createAccountsTable);
    tx.executeSql(createTransactionsTable);

    // Оновлення таблиці Accounts, додавання колонки updatedAt
    // tx.executeSql(updateAccountsTableToAddUpdatedAt);

    // Додавання запису адміністратора
    // Переконайтеся, що ви додали перевірку на існування адміністратора,
    // щоб уникнути дублювання при кожному запуску міграції.
    tx.executeSql('SELECT * FROM Users WHERE name = ?', ['admin'], (_, { rows }) => {
      if (rows.length === 0) {
        // Адміністратор не знайдений, додати його
        tx.executeSql(insertAdmin);
        tx.executeSql(insertAccount);
      }
    });
    tx.executeSql('SELECT * FROM Accounts WHERE id = ?', ['cash'], (_, { rows }) => {
      if (rows.length === 0) {
        tx.executeSql(insertAccount);
      }
    });
  }, (error) => {
    console.error("Error during database migration:", error);
  }, () => {
    console.log("Database migration completed successfully");
  });
};
