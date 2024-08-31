import { Transaction } from '../../features/transaction/types';
import { filterStrategies } from './filterStrategies';
import { FilterCriteria } from './types';

export const applyFilters = (transactions: Transaction[], criteria: FilterCriteria): Transaction[] => {
    return transactions.filter(transaction => {
        return Object.keys(criteria).every(key => {
            const filterStrategy = filterStrategies[key as keyof typeof filterStrategies];
            return filterStrategy ? filterStrategy(criteria)(transaction) : true;
        });
    });
};