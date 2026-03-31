import { AccountDTO } from "../../application/dtos/AccountDTO";
import { Transaction, TransactionType } from "../../domain/entities/Transaction";

export interface ITransactionRepository {
    
    findAccount(accountNumber: string): Promise<AccountDTO | null>;
    
    findTransactionsByAccount(accountNumber: string): Promise<Transaction[]>;
    
    updateBalance(accountNumber: string, amount: number): Promise<void>;

    saveTransaction(accountNumber: string, type: TransactionType, amount: number): Promise<void>;
    
    transfer(fromAccount: string, toAccount: string, fromBalance: number, toBalance: number): Promise<void>;
}