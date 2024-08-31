import { Transaction } from "../../../features/transaction/types";
import CurrencyUtils from "../../../utils/currencyUtils";
import DateUtils from "../../../utils/timeUtils";

export interface TransactionStatistics {
    title: string;
    value: number;
}

class StatisticsService {
    calculateTotalAmount(transactions: Transaction[]): number {
        return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    }

    calculateAverageDailyAmount(transactions: Transaction[]): number {
        if (transactions.length === 0) {
            return 0;
        }

        const sortedTransactions = [...transactions].sort((a, b) => a.time - b.time);
        const totalAmount = this.calculateTotalAmount(transactions);

        const days = DateUtils.getDaysBetween(
            sortedTransactions[0].time,
            sortedTransactions[sortedTransactions.length - 1].time
        ) + 1;

        if (days === 1) {
            return totalAmount;
        }
        return totalAmount / days;
    }
    generateStatistics(transactions: Transaction[]): TransactionStatistics[] {
        const totalAmount = CurrencyUtils.toMajorUnits(this.calculateTotalAmount(transactions));
        const averageDailyAmount = CurrencyUtils.toMajorUnits(this.calculateAverageDailyAmount(transactions));

        return [
            { title: 'Всього витрачено', value: totalAmount },
            { title: 'В середньому щодня', value: averageDailyAmount },
        ];
    }
}

export const statisticsService = new StatisticsService();
