import { ListUserController } from "../presentation/controllers/users/ListUserController";
import { ListUsersUseCase } from "../../application/usecases/users/ListUserUseCase";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
 
export function makeListUsersController(): ListUserController {
    
    const userRepository = new PrismaUserRepository();
    const listUsersUseCase = new ListUsersUseCase(userRepository);
    
    return new ListUserController(listUsersUseCase);
}