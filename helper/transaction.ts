import dayjs, { Dayjs } from "dayjs";
import { Transaction } from "../features/transaction/types";
import { GroupedTransactions, TransactionStatistics, TransactionSummary } from "./types";
import DateUtils from "../utils/timeUtils";

const groupByDate = (transactions: Transaction[]): GroupedTransactions => transactions.reduce((acc, transaction) => {
    const date = DateUtils.formatters.shortMotnthFormatter.format(DateUtils.convertUnixToDate(transaction.time)); 

    acc[date] = acc[date] || [];
    acc[date].push(transaction);

    return acc;
}, {} as GroupedTransactions);

export const TransactionHelper = {
    summarizeByDate: (transactions: Transaction[] = []): TransactionSummary[] => {
        const grouped = groupByDate(transactions);
        return Object.entries(grouped).map(([date, transactions]) => {
            const total = transactions.reduce((sum, { amount }) => sum + amount, 0) / 100;
            return { date, total, data: transactions };
        });
    },
    findMaxAmountTransaction: (transactions: Transaction[] = []): Transaction | undefined => {
        return transactions.reduce((max, transaction) => max.amount > transaction.amount ? max : transaction, transactions[0]);
    },
    calculateTotalAmount: (transactions: Transaction[] = []): number => {
        return transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    },

    calculateAverageDailyAmount: (transactions: Transaction[] = [], dayOfMonth: number): number => {
        const totalAmount = TransactionHelper.calculateTotalAmount(transactions);
        return totalAmount / dayOfMonth;
    },

    findTransactionsToday: (transactions: Transaction[] = []): Transaction[] => {
        const today = dayjs().date();
        return transactions.filter(transaction => dayjs(transaction.time * 1000).date() === today);
    },

    calculateTotalAmountToday: (transactions: Transaction[]): number => {
        const transactionsToday = TransactionHelper.findTransactionsToday(transactions);
        return TransactionHelper.calculateTotalAmount(transactionsToday);
    },
    getStartAndEndDate: (transactions: Transaction[]): { startDate: Dayjs, endDate: Dayjs } => {
        const times = transactions.map(transaction => transaction.time);
        const startDate = dayjs.unix(Math.min(...times)); // Мінімальний час
        const endDate = dayjs.unix(Math.max(...times));   // Максимальний час
        
        return { startDate, endDate };
    },
    generateStatistics: (
        transactions: Transaction[],
        startDate: Dayjs,
        endDate: Dayjs
    ): TransactionStatistics[] => {

        const totalDays = endDate.diff(startDate, 'day') + 1; // Розраховуємо кількість днів у діапазоні

        const totalAmount = TransactionHelper.calculateTotalAmount(transactions);
        
        const average = totalAmount / totalDays;
        const totalAmountToday = TransactionHelper.calculateTotalAmountToday(transactions);
        const potentialMonthlyExpenses = (average / 100) * dayjs(endDate).daysInMonth();

        return [
            {
                title: "Всього витрачено",
                value: Number((totalAmount / 100).toFixed(2)),
            },
            {
                title: "В середньому щодня",
                value: Number((average / 100).toFixed(2)),
            },
            {
                title: "Сьогодні",
                value: Number((totalAmountToday / 100).toFixed(2)),
            },
            {
                title: "Потенційні витрати до кінця місяця",
                value: potentialMonthlyExpenses,
            },
        ];
    },
};