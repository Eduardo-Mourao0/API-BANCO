import { Account } from "../entities/Account";
import { PrismaTransactionClient } from "../managers/ITransactionManager";

export interface IAccountRepository {
   
    findAccount(accountNumber: string): Promise<Account | null>;
    
    updateBalance(
        accountNumber: string,
        balance: number,
        tx?: PrismaTransactionClient
    ): Promise<void>;
    
    deleteAccount(accountNumber: string): Promise<void>;
}
