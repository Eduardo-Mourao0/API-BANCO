import { AccountDTO } from "../../application/dtos/AccountDTO";

export interface ITransactionRepository{

    findAccount(accountNumber: string): Promise<AccountDTO | null>

    updateBalance(accountNumber: string, amount: number): Promise<void>;

    transfer(fromAccount: string, toAccount: string, fromBalance: number, toBalance: number): Promise<void>;
}