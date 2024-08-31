import { baseApi } from '../api';
import { mapBankAccountTransactions } from './lib';
import { Transaction, TransactionDto, TransactionsRequestArgs } from './types';
export const transactionApi = baseApi.injectEndpoints(
    {
        overrideExisting: true,
        endpoints: (builder) => ({
            getTransactions: builder.query<Transaction[], TransactionsRequestArgs>({
                query:
                    ({ accountId, from, to }) => {

                        return `https://api.monobank.ua/personal//statement/${accountId}/${from}/${to}`
                    }
                ,
                transformResponse: (response: TransactionDto[], _, args) => mapBankAccountTransactions(response, args.accountId),
                async onQueryStarted(args, { queryFulfilled }) {},
            },),
        }),
    });

export const { useLazyGetTransactionsQuery } = transactionApi;
