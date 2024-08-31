import { baseApi } from '../api';
import { mapClientAccounts } from './lib';
import { Account, MonobankClientDto } from './types';
export const accountApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getBankAccounts: builder.query<Account[], void>({
            query: () => `https://api.monobank.ua/personal/client-info`,
            transformResponse: (response: MonobankClientDto) => mapClientAccounts(response),
            async onQueryStarted(_, { queryFulfilled, dispatch }) { },
        }),
    }),
});

export const { useLazyGetBankAccountsQuery, useGetBankAccountsQuery } = accountApi;
