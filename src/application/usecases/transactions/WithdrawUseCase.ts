import { Account } from "../../../domain/entities/Account";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { ITransactionManager } from "../../../domain/managers/ITransactionManager";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";

export class WithdrawUseCase{
    constructor(
        private transactionManager: ITransactionManager,
        private accountRepository: IAccountRepository
    ){}

    async execute(accountNumber: string, amount: number){

        const account = await this.accountRepository.findAccount(accountNumber);

        if(!account) throw new BusinessError("Conta nao encontrada!");

        account.withdraw(amount);
       
        return this.transactionManager.withdraw(account, amount)
    }
}