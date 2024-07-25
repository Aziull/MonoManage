import dayjs, { Dayjs } from "dayjs";
import { Transaction } from "../features/transaction/types";
import { GroupedTransactions, TransactionStatistics, TransactionSummary } from "./types";

const groupByDate = (transactions: Transaction[]): GroupedTransactions => transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.time * 1000).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: "numeric"
    });

    acc[date] = acc[date] || [];
    acc[date].push(transaction);

    return acc;
}, {} as GroupedTransactions);

export const TransactionHelper = {
    summarizeByDate: (transactions: Transaction[]): TransactionSummary[] => {
        const grouped = groupByDate(transactions);
        return Object.entries(grouped).map(([date, transactions]) => {
            const total = transactions.reduce((sum, { amount }) => sum + amount, 0) / 100;
            return { date, total, data: transactions };
        });
    },
    findMaxAmountTransaction: (transactions: Transaction[]): Transaction | undefined => {
        return transactions.reduce((max, transaction) => max.amount > transaction.amount ? max : transaction, transactions[0]);
    },
    calculateTotalAmount: (transactions: Transaction[]): number => {
        return transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    },

    calculateAverageDailyAmount: (transactions: Transaction[], dayOfMonth: number): number => {
        const totalAmount = TransactionHelper.calculateTotalAmount(transactions);
        return totalAmount / dayOfMonth;
    },

    findTransactionsToday: (transactions: Transaction[]): Transaction[] => {
        const today = dayjs().date();
        return transactions.filter(transaction => dayjs(transaction.time * 1000).date() === today);
    },

    calculateTotalAmountToday: (transactions: Transaction[]): number => {
        const transactionsToday = TransactionHelper.findTransactionsToday(transactions);
        return TransactionHelper.calculateTotalAmount(transactionsToday);
    },
    generateStatistics: (transactions: Transaction[]): TransactionStatistics[] => {
        const totalAmount = TransactionHelper.calculateTotalAmount(transactions);
        const today = dayjs().date();
        const average = totalAmount / today;
        const totalAmountToday = TransactionHelper.calculateTotalAmountToday(transactions);
        const potentialMonthlyExpenses = (average / 100) * dayjs().daysInMonth();

        return [
            {
                title: "Всього витрачено цього місяця",
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
                title: "Потенційні витрати в місяць",
                value: potentialMonthlyExpenses,
            },
        ];
    },
    createTransaction: (type: "income" | "expense", amount: string, description: string, date: Dayjs, accountId: string) => {
        let error: null | string = null;

        const convertByType = (type: "income" | "expense", coinValue: string | number) => {
            const numValue = Number(amount) * 100;
            return type === "income" ? numValue : -numValue;
        }
        const id = self.crypto.randomUUID();
        if (!description.trim().length || !date || (!amount.trim.length && !Number(amount.trim()))) {
            error = 'Не всі поля заповнені'
        }

        const transaction: Transaction = {
            id,
            amount: convertByType(type, amount),
            description,
            time: date.unix(),
            deleted: false,
            balance: 0,
            accountId: accountId
        }

        return { transaction, error }
    }
};