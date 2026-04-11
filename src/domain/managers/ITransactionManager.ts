import { Account } from "../entities/Account";

export interface ITransactionManager {
    deposit(account: Account, amount: number): Promise<{
        accountNumber: string;
        amount: number;
        balance: number;
        date: Date;
    }>;

    withdraw(account: Account, amount: number): Promise<{
        accountNumber: string;
        amount: number;
        balance: number;
        date: Date;
    }>;

    transfer(fromAccount: Account, toAccount: Account, amount: number): Promise<{
        fromAccount: string;
        toAccount: string;
        amount: number;
        date: Date;
    }>;
}