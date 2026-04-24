import { Account } from "../../../domain/entities/Account";
import { AuthorizationError } from "../../../domain/exceptions/AuthorizationError";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { ITransactionManager } from "../../../domain/managers/ITransactionManager";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class TransferUseCase {
    constructor(
        private readonly transactionManager: ITransactionManager,
        private readonly accountRepository: IAccountRepository,
        private readonly transactionRepository: ITransactionRepository,
        private readonly userRepository: IUserRepository
    ) {}

    async execute(
        authenticatedUserId: string | undefined,
        toAccountNumber: string,
        amount: number
    ): Promise<Account> {
        const authenticatedUser = await this.getAuthenticatedUser(authenticatedUserId);
        const fromAccountNumber = authenticatedUser.accountNumber;

        const [from, to] = await Promise.all([
            this.accountRepository.findAccount(fromAccountNumber),
            this.accountRepository.findAccount(toAccountNumber)
        ]);

        if (!from) {
            throw new BusinessError("Conta de origem nao encontrada.");
        }

        if (!to) {
            throw new BusinessError("Conta de destino nao encontrada.");
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

    private async getAuthenticatedUser(authenticatedUserId: string | undefined) {
        if (!authenticatedUserId) {
            throw new AuthorizationError("Usuario nao autenticado.");
        }

        const authenticatedUser = await this.userRepository.findById(authenticatedUserId);

        if (!authenticatedUser) {
            throw new BusinessError("Usuario nao encontrado.");
        }

        return authenticatedUser;
    }
}
