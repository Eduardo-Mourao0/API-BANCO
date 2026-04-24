import { Account } from "../../../domain/entities/Account";
import { AuthorizationError } from "../../../domain/exceptions/AuthorizationError";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { ITransactionManager } from "../../../domain/managers/ITransactionManager";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class DepositUseCase {
    constructor(
        private readonly transactionManager: ITransactionManager,
        private readonly accountRepository: IAccountRepository,
        private readonly transactionRepository: ITransactionRepository,
        private readonly userRepository: IUserRepository
    ) {}

    async execute(authenticatedUserId: string | undefined, amount: number): Promise<Account> {
        
        const authenticatedUser = await this.getAuthenticatedUser(authenticatedUserId);

        const account = await this.accountRepository.findAccount(authenticatedUser.accountNumber);

        if (!account) {
            throw new BusinessError("Conta nao encontrada.");
        }

        account.deposit(amount);

        return this.transactionManager.execute(async (tx) => {
            await this.accountRepository.updateBalance(
                account.accountNumber,
                account.balance,
                tx
            );
            await this.transactionRepository.save(
                account.accountNumber,
                "DEPOSIT",
                amount,
                tx
            );

            return account;
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
