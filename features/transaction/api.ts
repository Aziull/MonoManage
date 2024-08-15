import { BankAccountTransactionsRequestArgs, Transaction, TransactionDto } from './types';
import { baseApi } from '../api';
import { getBankApiUrl } from '../api/config';
import { mapBankAccountTransactions } from './lib';
// import { updateTransactionsInDb } from './thunks';
// import { updateTransactions } from './slice';

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBankAccountTransactions: builder.query<Transaction[], BankAccountTransactionsRequestArgs>({
            query:
                ({ bankName, requestPath, accountId, from, to }) => {

                    return `${getBankApiUrl(bankName, requestPath)}/${accountId}/${from}/${to}`
                }
            ,
            transformResponse: (response: TransactionDto[], _, args) => mapBankAccountTransactions(response, args.accountId),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                console.log('Отримання транзакцій розпочато');
                try {
                    const { data } = await queryFulfilled;

                    // dispatch(updateTransactionsInDb(data));
                    // dispatch(updateTransactions(data))
                    console.log('транзакції отримано успішно', data);
                } catch (error) {
                    console.error('Помилка отримання транзакцій', error);
                }
            },
        },),
    }),
});

export const { useGetBankAccountTransactionsQuery } = transactionApi;
