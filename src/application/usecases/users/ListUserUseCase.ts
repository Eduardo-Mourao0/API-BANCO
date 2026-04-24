import { AuthorizationError } from "../../../domain/exceptions/AuthorizationError";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class ListUsersUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(authenticatedUserId?: string) {
        if (!authenticatedUserId) {
            throw new AuthorizationError("Usuario nao autenticado.");
        }

        const user = await this.userRepository.findById(authenticatedUserId);

        if (!user) {
            throw new BusinessError("Usuario nao encontrado.");
        }

        return [user];
    }
}
