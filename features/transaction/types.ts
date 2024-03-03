import { BankApiUrlsType, BankList } from "../api/config";

export interface TransactionDto {
    amount: number;
    balance: number;
    cashbackAmount?: number;
    commissionRate?: number;
    currencyCode?: number;
    description: string;
    hold?: boolean;
    id: string;
    mcc?: string;
    operationAmount?: number;
    originalMcc?: number;
    receiptId?: string;
    time: number;
}

export interface Transaction extends TransactionDto {
    accountId: string,
    deleted: boolean
};


export interface BankRequestArgs {
    bankName: BankList,
    requestPath: keyof BankApiUrlsType[keyof BankApiUrlsType]['requestType'],
}

export interface BankAccountTransactionsRequestArgs extends BankRequestArgs {
    accountId: string | number,
    from: number,
    to: number,
}
