import { BankAccountTransactionsRequestArgs, Transaction, TransactionDto } from './types';
import { baseApi } from '../api';
import { getBankApiUrl } from '../api/config';
import { mapBankAccountTransactions } from './lib';

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBankAccountTransactions: builder.query<Transaction[], BankAccountTransactionsRequestArgs>({
            query:
                ({ bankName, requestPath, accountId, from, to }) => {
                    
                    return `${getBankApiUrl(bankName, requestPath)}/${accountId}/${from}/${to}`
                }
            ,
            transformResponse: (response: TransactionDto[], _, args) => mapBankAccountTransactions(response, args.accountId)
        },),
    }),
});

export const { useGetBankAccountTransactionsQuery } = transactionApi;
