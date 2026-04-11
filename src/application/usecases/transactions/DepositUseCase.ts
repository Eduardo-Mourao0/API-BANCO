import { Account } from "../../../domain/entities/Account";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { ITransactionManager } from "../../../domain/managers/ITransactionManager";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";

export class DepositUseCase{
    constructor(
        private transactionManager: ITransactionManager,
        private accountRepository: IAccountRepository
    ){}

    async execute(accountNumber: string, amount: number){

        const account = await this.accountRepository.findAccount(accountNumber);
        if(!account) throw new BusinessError("Conta não encontrada.");

        account.deposit(amount);
        
        return this.transactionManager.deposit(account, amount);
    }
}