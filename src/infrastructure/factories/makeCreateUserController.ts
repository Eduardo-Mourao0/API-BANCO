import { UserController } from "../presentation/controllers/users/UserController";
import { CreateUserUseCase } from "../../application/usecases/users/CreateUserUseCase";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher";

export function makeCreateUserController(): UserController {
    const userRepository = new PrismaUserRepository();
    const accountRepository = new PrismaAccountRepository();
    const passwordHasher = new BcryptPasswordHasher();
    const createUserUseCase = new CreateUserUseCase(userRepository, accountRepository, passwordHasher);

    return new UserController(createUserUseCase);
}