import { Account } from "../entities/Account";

export interface IAccountRepository {
   
    findAccount(accountNumber: string): Promise<Account | null>;
    
    updateBalance(accountNumber: string, balance: number): Promise<void>;
    
    deleteAccount(accountNumber: string): Promise<void>;
}