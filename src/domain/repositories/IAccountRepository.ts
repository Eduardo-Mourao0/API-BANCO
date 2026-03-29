import { AccountDTO } from "../../application/dtos/AccountDTO";

export interface IAccountRepository{
    
    findAccount(accountNumber: string): Promise<AccountDTO | null>;
   
    deleteAccount(accountNumber: string): Promise<void>;
}