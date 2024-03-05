import dayjs from "dayjs";
import { Transaction } from "../../features/transaction/types";
import { FilterCriteria } from "./types";

const categoriesFilter = (criteria: FilterCriteria) => (transaction: Transaction) => {
    return !!criteria.categories && transaction.mcc ? criteria.categories.includes(transaction.mcc) : true;
};

const descriptionFilter = (criteria: FilterCriteria) => (transaction: Transaction) => {
    return transaction.description.toLowerCase().includes(criteria.description?.toLowerCase() || '') 
}

const timeframeFilter = (criteria: FilterCriteria) => (transaction: Transaction) => {
    if (!criteria.timeframe?.start || !criteria.timeframe?.end) return true;
    const {start, end} = criteria.timeframe;
    const transactionDate = dayjs(transaction.time * 1000);
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    return transactionDate.isAfter(startDate) && transactionDate.isBefore(endDate);
};

const accountIdFilter = (criteria: FilterCriteria) => (transaction: Transaction) => {
    return criteria.accountsId ? criteria.accountsId.includes(transaction.accountId) : true;
};

export const filterStrategies = {
    categories: categoriesFilter,
    timeframe: timeframeFilter,
    accountsId: accountIdFilter,
    description: descriptionFilter,
};
