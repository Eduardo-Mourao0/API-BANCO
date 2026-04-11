import { Account } from "../../../domain/entities/Account";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { ITransactionManager } from "../../../domain/managers/ITransactionManager";
 
export class TransferUseCase {
    constructor(
        private transactionManager: ITransactionManager,
        private accountRepository: IAccountRepository
    ) {}
 
    async execute(fromAccountNumber: string, toAccountNumber: string, amount: number) {
        
        const [from, to] = await Promise.all([
            this.accountRepository.findAccount(fromAccountNumber),
            this.accountRepository.findAccount(toAccountNumber)
        ]);
 
        if (!from) throw new BusinessError("Conta de origem não encontrada.");
        if (!to) throw new BusinessError("Conta de destino não encontrada.");

        from.transfer(amount, to);
 
        return this.transactionManager.transfer(
            from, 
            to, 
            amount
        );
    }
}