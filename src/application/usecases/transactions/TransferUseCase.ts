import { Account } from "../../../domain/entities/Account";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { ITransactionManager } from "../../../domain/managers/ITransactionManager";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
 
export class TransferUseCase {
    constructor(
        private readonly transactionManager: ITransactionManager,
        private readonly accountRepository: IAccountRepository,
        private readonly transactionRepository: ITransactionRepository
    ) {}
 
    async execute(
        fromAccountNumber: string,
        toAccountNumber: string,
        amount: number
    ): Promise<Account> {
        const [from, to] = await Promise.all([
            this.accountRepository.findAccount(fromAccountNumber),
            this.accountRepository.findAccount(toAccountNumber)
        ]);
 
        if (!from) {
            throw new BusinessError("Conta de origem nÃ£o encontrada.");
        }

        if (!to) {
            throw new BusinessError("Conta de destino nÃ£o encontrada.");
        }

        from.transfer(amount, to);
 
        return this.transactionManager.execute(async (tx) => {
            await Promise.all([
                this.accountRepository.updateBalance(
                    from.accountNumber,
                    from.balance,
                    tx
                ),
                this.accountRepository.updateBalance(
                    to.accountNumber,
                    to.balance,
                    tx
                ),
                this.transactionRepository.save(
                    from.accountNumber,
                    "TRANSFER",
                    amount,
                    tx
                ),
                this.transactionRepository.save(
                    to.accountNumber,
                    "DEPOSIT",
                    amount,
                    tx
                )
            ]);

            return from;
        });
    }
}
