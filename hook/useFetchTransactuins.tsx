import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useLazyGetTransactionsQuery } from "../features/transaction/api";
import { useCallback, useState } from "react";
import { accountRepository } from "../db";
import DateUtils from "../utils/timeUtils";
import { upsertAccountTransactions } from "../features/transaction/thunks";
import { addProcessedAccount, resetProcessedAccounts, setFetchedAccountsCount } from "../features/transaction/slice";

export const useFetchTransactions = (accountsId: string[] | undefined) => {
    const { authToken } = useSelector((state: RootState) => state.authToken);
    const [refreshing, setRefreshing] = useState(false);
    const [triggerGetTransactions] = useLazyGetTransactionsQuery();

    const dispatch = useDispatch<AppDispatch>();

    const refetch = useCallback(async () => {
        if (!authToken || !accountsId) return;
        
        setRefreshing(true);
        dispatch(setFetchedAccountsCount(accountsId.length));
        dispatch(resetProcessedAccounts());

        for (const id of accountsId) {
            try {
                const accountInDb = await accountRepository.getById(id);
                const lastSync = accountInDb?.lastSync;
                const from = lastSync && lastSync > DateUtils.getUnixTime30DaysAgo()
                    ? lastSync
                    : DateUtils.getUnixTime30DaysAgo();
                const to = DateUtils.getCurrentUnixTime();

                const { data } = await triggerGetTransactions({ accountId: id, from, to });
                if (data) {
                    dispatch(upsertAccountTransactions(data));
                }
                dispatch(addProcessedAccount());
            } catch (error) {
                console.log(`Error fetching transactions for account ${id}:`, error);
            }
        }

        setRefreshing(false);
    }, [authToken, accountsId]);

    return { refetch, refreshing };
};