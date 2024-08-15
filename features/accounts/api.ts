import { Account, MonobankClientDto } from './types';
import { mapClientAccounts } from './lib';
import { baseApi } from '../api';
import { getBankApiUrl } from '../api/config';
import { BankRequestArgs } from '../transaction/types';
import { updateAccountInDb } from './thunks';
import { updateAccounts } from './slice';
export const accountApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBankAccounts: builder.query<Account[], BankRequestArgs>({
            query: ({ bankName, requestPath }) => `${getBankApiUrl(bankName, requestPath)}`,
            transformResponse: (response: MonobankClientDto) => mapClientAccounts(response),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                console.log('Отримання рахунків розпочато');
                try {
                    const { data } = await queryFulfilled;

                    dispatch(updateAccountInDb(data));
                    dispatch(updateAccounts(data))
                    console.log('Рахунок отримано успішно', data);
                } catch (error) {
                    console.error('Помилка отримання рахунків', error);
                }
            },
        }),
    }),
});

export const { useGetBankAccountsQuery } = accountApi;
