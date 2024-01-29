import dayjs from "dayjs";
import { useIgnoredTransactionsContext } from "../context/TransactionsContext";
import { Transaction } from "../api/monoApi";

export const useStats = () => {
    const { state } = useIgnoredTransactionsContext();
    const totalAmount = state.transactions.reduce((accumulator, transaction) => {
        return accumulator + transaction.amount;
    }, 0);

    const today = dayjs().date();
    const average = totalAmount / today;

    const transactionsToday = state.transactions.filter((transaction: Transaction) => {
        const transactionDate: dayjs.Dayjs = dayjs(transaction.time * 1000);

        return transactionDate.date() === today;
    });

    const totalAmountToday = transactionsToday.reduce((sum: number, transaction: Transaction) => {
        return sum + transaction.amount;
    }, 0);

    const data: { title: string, value: number }[] = [
        {
            title: "Всього витрачено цього місяця",
            value: Number((totalAmount / 100).toFixed(2))
        },
        {
            title: "В середньому щодня",
            value: Number((average / 100).toFixed(2))
        },
        {
            title: "Сьогодні",
            value: Number((totalAmountToday / 100).toFixed(2))
        },
        {
            title: "Потенційні витрати в місяць",
            value: Number((average / 100).toFixed(2)) * dayjs().daysInMonth(),
        }
    ]


    return { stats: data }
}