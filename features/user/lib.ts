import { Account, MonobankClientDto } from "./types";

export const mapClientAccounts = (dto: MonobankClientDto): Account[] => {
    const accountsDto = dto.accounts;
    return accountsDto.map(account => ({
        id: account.id,
        name: account.maskedPan[0],
        balance: account.balance,
    }))
}