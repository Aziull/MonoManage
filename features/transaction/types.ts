import { BankApiUrlsType, BankList } from "../api/config";

export interface TransactionDto {
    amount: number;
    comment?: string;
    balance?: number;
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
    time: UnixTimestampSeconds;
}

export interface Transaction extends TransactionDto {
    accountId: string,
    deleted: boolean
};


export interface BankRequestArgs {
    bankName: BankList,
    requestPath: keyof BankApiUrlsType[keyof BankApiUrlsType]['requestType'],
}
export interface TransactionsRequestArgs {
    accountId: string,
    from: number,
    to: number,
}
export interface BankAccountTransactionsRequestArgs extends BankRequestArgs {
    accountId: string,
    from: number,
    to: number,
}

export interface BankAccountTransactionsRequestArgs2 extends BankRequestArgs {
    accounts: {
        id: string,
        lastSync: number,
    }[],
    from: number,
    to: number,
}

