import { AuthorizationError } from "../../../domain/exceptions/AuthorizationError";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetExtractUseCase {
    constructor(
        private readonly transactionRepository: ITransactionRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly userRepository: IUserRepository
    ) {}

    async execute(authenticatedUserId: string | undefined) {
        const authenticatedUser = await this.ensureAuthorizedUser(authenticatedUserId);

        const accountNumber = authenticatedUser.accountNumber;

        const account = await this.accountRepository.findAccount(accountNumber);

        if (!account) {
            throw new BusinessError("Conta nao encontrada");
        }

        return this.transactionRepository.findByAccount(accountNumber);
    }

    private async ensureAuthorizedUser(authenticatedUserId: string | undefined) {
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
