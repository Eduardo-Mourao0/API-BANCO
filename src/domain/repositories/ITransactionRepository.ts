import { Transaction, TransactionType } from "../entities/Transaction";
import { PrismaTransactionClient } from "../managers/ITransactionManager";

export interface ITransactionRepository {
   
    save(
        accountNumber: string,
        type: TransactionType,
        amount: number,
        tx?: PrismaTransactionClient
    ): Promise<void>;
    
    findByAccount(accountNumber: string): Promise<Transaction[]>;
}
