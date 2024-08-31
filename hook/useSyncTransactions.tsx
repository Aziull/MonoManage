import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetBankAccountsQuery } from "../features/accounts/api";
import { upsertAccountsAsync } from "../features/accounts/thunks";
import { AppDispatch, RootState } from "../store";
import { useFetchTransactions } from "./useFetchTransactuins";

const useSyncTransactions = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { authToken } = useSelector((state: RootState) => state.authToken);
    const [triggerGetBankAccounts, { data: accountsData }] = useLazyGetBankAccountsQuery();

    const ids = useMemo(() => {
        return accountsData?.map(acc => acc.id);
    }, [accountsData])

    const { refetch } = useFetchTransactions(ids);


    useEffect(() => {
        if (!authToken) return
        const syncBankAccounts = async () => {
            const { data } = await triggerGetBankAccounts();
            if (data) {
                dispatch(upsertAccountsAsync(data));
            }

        }
        syncBankAccounts();
    }, [authToken]);

    useEffect(() => {
        if (!accountsData) return;
        refetch()
    }, [accountsData,refetch]);

};

export default useSyncTransactions;
