export enum BankList {
    monobank = 'monobank',
}

export type BankApiUrlsType = Record<BankList, {
    baseApi: string;
    requestType: {
        clientInfo: string;
        transactions: string;
    };
}>

export const BANK_API_URLS = {
    monobank: {
        baseApi: 'https://api.monobank.ua/personal',
        requestType: {
            clientInfo: '/client-info',
            transactions: "/statement"
        }

    }
};

export function getBankApiUrl(bankName: keyof BankApiUrlsType, requestType: keyof BankApiUrlsType[keyof BankApiUrlsType]['requestType']): string | undefined {
    const bank = BANK_API_URLS[bankName];
    if (!bank) {
        console.error(`Bank ${bankName} not found.`);
        return undefined;
    }

    const requestPath = bank.requestType[requestType];
    if (!requestPath) {
        console.error(`Request type ${requestType} for bank ${bankName} not found.`);
        return undefined;
    }

    return `${bank.baseApi}${requestPath}`;
}
