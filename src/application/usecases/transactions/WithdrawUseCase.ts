import { Account } from "../../../domain/entities/Account";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { ITransactionManager } from "../../../domain/managers/ITransactionManager";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";

export class WithdrawUseCase {
    constructor(
        private readonly transactionManager: ITransactionManager,
        private readonly accountRepository: IAccountRepository,
        private readonly transactionRepository: ITransactionRepository
    ) {}

    async execute(accountNumber: string, amount: number): Promise<Account> {
        const account = await this.accountRepository.findAccount(accountNumber);

        if (!account) {
            throw new BusinessError("Conta nao encontrada!");
        }

        account.withdraw(amount);

        return this.transactionManager.execute(async (tx) => {
            await this.accountRepository.updateBalance(
                account.accountNumber,
                account.balance,
                tx
            );
            await this.transactionRepository.save(
                account.accountNumber,
                "WITHDRAW",
                amount,
                tx
            );

            return account;
        });
    }
}
