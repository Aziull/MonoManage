import dayjs from "dayjs";
import { Transaction } from "../types/transaction";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useStats = () => {
    const { transactions } = useSelector((state: RootState) => state.transaction);
    
    const totalAmount = transactions.reduce((accumulator, transaction) => {
        return accumulator + transaction.amount;
    }, 0);

    const today = dayjs().date();
    const average = totalAmount / today;

    const transactionsToday = transactions.filter((transaction: Transaction) => {
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