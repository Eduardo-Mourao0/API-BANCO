import { AuthorizationError } from "../../../domain/exceptions/AuthorizationError";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class DeleteUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly accountRepository: IAccountRepository
    ) {}

    async execute(authenticatedUserId: string | undefined) {
        if (!authenticatedUserId) {
            throw new AuthorizationError("Usuario nao autenticado.");
        }

        const authenticatedUser = await this.userRepository.findById(authenticatedUserId);

        if (!authenticatedUser) {
            throw new BusinessError("Usuario nao encontrado.");
        }

        const accountData = await this.accountRepository.findAccount(authenticatedUser.accountNumber);

        if (!accountData) {
            throw new BusinessError("Conta do usuario nao encontrada!");
        }

        authenticatedUser.canDelete(accountData.balance);

        await this.userRepository.delete(authenticatedUser.cpf);

        return {
            message: "Usuario e conta deletados com sucesso."
        };
    }
}
