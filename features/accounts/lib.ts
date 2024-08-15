import { Account as AccountEntity } from "../../services/database/entities";
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
    const today = new Date();
    const from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    return {
        ...account,
        lastSync: account.lastSync ? new Date(account.lastSync).getTime() : from.getTime()
    }

}

export const mapToEntity = (account: Account, userId: string, updatedAt: number): AccountEntity => {
    return {
        ...account,
        updatedAt,
        userId
    }

}