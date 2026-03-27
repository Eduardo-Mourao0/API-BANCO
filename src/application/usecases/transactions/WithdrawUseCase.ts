import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { Account } from "../../../domain/entities/Account";
import { BusinessError } from "../../../domain/exceptions/BusinessError";

export class WithdrawUseCase{
    constructor(private transactionRepository: ITransactionRepository){}
    
    async execute(accountNumber: string, amount: number){

        const accountData = await this.transactionRepository.findAccount(accountNumber);

        if(!accountData) throw new BusinessError("Conta nao encontrada!");

        const account = new Account(
            accountData.accountNumber,
            accountData.balance
        );

        account.withdraw(amount);
       
        await this.transactionRepository.updateBalance(accountNumber, amount);

        return {
            message: 'Saque realizado com SUCESSO ✅',
            balance: account.balance
        }
    }
}