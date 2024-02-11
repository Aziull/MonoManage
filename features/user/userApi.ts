import { Account, MonobankClientDto } from './types';
import { mapClientAccounts } from './lib';
import { baseApi } from '../api';
import { getBankApiUrl } from '../api/config';
import { BankRequestArgs } from '../transaction/types';
import { AccountModel } from  '../../services/database';
import { Account as AccountEntity } from  '../../services/database/entities';
import { RootState } from '../../store';
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBankAccounts: builder.query<Account[], BankRequestArgs>({
      query: ({ bankName, requestPath }) => `${getBankApiUrl(bankName, requestPath)}`,
      transformResponse: (response: MonobankClientDto) => mapClientAccounts(response),
    }),
  }),
});

export const { useGetBankAccountsQuery } = userApi;
