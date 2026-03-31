import { CreateUserUseCase } from "../../application/usecases/users/CreateUserUseCase";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { UserController } from "../presentation/controllers/users/UserController";

export function makeCreateUserController(): UserController {

    const userRepository = new PrismaUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    return new UserController(createUserUseCase);
}