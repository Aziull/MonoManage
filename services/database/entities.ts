export interface BaseModel {
    id: string;
}

export interface User extends BaseModel {
    name: string;
}

export interface Account extends BaseModel {
    name: string;
    balance: number; // REAL в SQLite відповідає number в TypeScript
    userId: string; // Зв'язок з таблицею Users
    type: 'cash' | 'bank'; // Тип рахунку (cash або bank)
    updatedAt: number;
}

export interface Transaction extends BaseModel {
    amount: number;
    balance: number;
    cashbackAmount?: number;
    commissionRate?: number;
    currencyCode?: number;
    description: string;
    hold?: boolean;
    mcc?: string;
    operationAmount?: number;
    originalMcc?: number;
    receiptId?: string;
    time: number;
    accountId: string; // Зв'язок з таблицею Accounts
    deleted: boolean;


}