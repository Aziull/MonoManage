import { Account as AccountEntity } from "../../db/entities";
import { Account, MonobankClientDto } from "./types";
import { } from "./types";

export const mapClientAccounts = (dto: MonobankClientDto): Account[] => {
    const { accounts: accountsDto } = dto;
    return accountsDto.map(account => ({
        id: account.id,
        name: account.maskedPan[0],
        balance: account.balance,
        type: 'bank',
    }))
}

export const mapToModel = ({ userId, updatedAt, ...account }: AccountEntity): Account => {
    return {
        ...account,
    }

}

export const mapToEntity = (account: Account, userId: string, updatedAt: number): AccountEntity => {
    return {
        ...account,
        updatedAt,
        userId
    }

}