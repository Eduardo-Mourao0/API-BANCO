import { DeleteController } from "../presentation/controllers/users/DeleteController";
import { DeleteUserUseCase } from "../../application/usecases/users/DeleteUserUseCase";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";

export function makeDeleteUserController(): DeleteController {
    
    const userRepository = new PrismaUserRepository();
    const accountRepository = new PrismaAccountRepository();
    const deleteUserUseCase = new DeleteUserUseCase(userRepository, accountRepository);

    return new DeleteController(deleteUserUseCase);
}