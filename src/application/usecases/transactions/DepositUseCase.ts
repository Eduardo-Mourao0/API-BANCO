import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { Account } from "../../../domain/entities/Account";
import { BusinessError } from "../../../domain/exceptions/BusinessError";

export class DepositUseCase{
    constructor(private transactionRepository: ITransactionRepository){}

    async execute(accountNumber: string, amount: number){

        const accountData = await this.transactionRepository.findAccount(accountNumber);

        if(!accountData){
            throw new BusinessError("Conta NAO encontrada.")
        }

        const account = new Account(
            accountData.accountNumber,
            accountData.balance
        );

        account.deposit(amount);

        await this.transactionRepository.updateBalance(
            account.accountNumber, 
            account.balance
        );

        return {
            accountNumber: account.accountNumber,
            amount,
            balance: account.balance,
            date: new Date()
        }
    }
}