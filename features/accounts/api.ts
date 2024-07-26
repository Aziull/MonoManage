import { Account, MonobankClientDto } from './types';
import { mapClientAccounts } from './lib';
import { baseApi } from '../api';
import { getBankApiUrl } from '../api/config';
import { BankRequestArgs } from '../transaction/types';
export const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBankAccounts: builder.query<Account[], BankRequestArgs>({
      query: ({ bankName, requestPath }) => `${getBankApiUrl(bankName, requestPath)}`,
      transformResponse: (response: MonobankClientDto) => mapClientAccounts(response),
      onCacheEntryAdded(arg, api) {
          
      },
    }),
  }),
});

export const { useGetBankAccountsQuery } = accountApi;
