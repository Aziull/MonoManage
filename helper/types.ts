import { Transaction } from "../features/transaction/types";

export type Predicate<T> = (a: T, b: T) => boolean;
export type Comparator<T> = (a: T, b: T) => number;
export type UpsertPredicate<T> = (item: T) => boolean;

export type GroupedTransactions = {
    [date: string]: Transaction[];
};
export type TransactionSummary = {
    date: string;
    total: number;
    data: Transaction[];
};
export type TransactionStatistics = {
    title: string;
    value: number;
  };