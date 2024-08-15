export interface BaseModel {
    id: string;
}

export interface User extends BaseModel {
    name: string;
}

export interface Account extends BaseModel {
    name: string;
    balance: number;
    userId: string;
    lastSync?: number;
    type: 'cash' | 'bank';
    updatedAt?: number;
}

export interface Transaction extends BaseModel {
    amount: number;
    balance?: number;
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
    accountId: string;
    deleted: boolean;
}

export type TransactionsFrequency = {
    description: string;
    frequency: number;
}