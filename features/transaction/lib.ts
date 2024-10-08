import { Transaction, TransactionDto } from "./types";
import { Transaction as TransactionEntity } from "../../db/entities";
export const mapBankAccountTransactions = (dto: TransactionDto[], accountId: string): Transaction[] => {
    return dto.map(account => ({
        ...account,
        accountId,
        deleted: false,
    }))
}

export const mapToEntity = (transaction: Transaction): TransactionEntity => ({
    ...transaction
})

export const mapToModel = (transaction: TransactionEntity): Transaction => ({
    ...transaction, 
    deleted: !!transaction.deleted
})