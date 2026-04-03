import { Account } from "../entities/Account";

export interface IAccountRepository{
    
    findAccount(accountNumber: string): Promise<Account | null>;
    
    deleteAccount(accountNumber: string): Promise<void>;
}