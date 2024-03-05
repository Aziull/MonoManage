interface BankAccountDto {
    id: string,
    balance: number,
    iban: string
}

export interface MonobankAccountDto extends BankAccountDto {
    sendId: string,
    currencyCode: number,
    cashbackType: string,
    balance: number,
    creditLimit: number,
    maskedPan: string[],
    type: string,
}

export interface MonobankClientDto {
    clientId: string,
    name: string,
    webHookUrl: string,
    permissions: string,
    accounts: MonobankAccountDto[]
}

export interface Account {
    id: string;
    name: string;
    balance: number;
    type: string; // Тип рахунку (custom або bank)
}

export interface User {
    id: string,
    name?: string;
}
