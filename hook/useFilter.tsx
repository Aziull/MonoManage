import { useSelector } from 'react-redux';
import { getTransactionsStatus, selectFilteredTransactions } from '../features/transaction/slice';
import { RootState } from '../store';

const useFilter = (deleted: boolean = false) => {
    const transactions = useSelector((state: RootState) => selectFilteredTransactions(state, deleted));
    const status = useSelector(getTransactionsStatus);
    
    return {
        transactions,
        status
    };
};

export default useFilter;