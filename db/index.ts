import { User } from './entities';
import { AccountRepository, Repository, TransactionRepository } from './models';

export { migrateDbIfNeeded } from './migrations';

export const userRepository = new Repository<User>('Users');
export const accountRepository = new AccountRepository('Accounts');
export const transactionRepository = new TransactionRepository('Transactions');