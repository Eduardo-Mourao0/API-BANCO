import { Transaction, TransactionType } from "../entities/Transaction";

export interface ITransactionRepository {
   
    save(accountNumber: string, type: TransactionType, amount: number): Promise<void>;
    
    findByAccount(accountNumber: string): Promise<Transaction[]>;
}