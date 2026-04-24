import { AuthController } from "../presentation/controllers/auth/AuthController";
import { LoginUseCase } from "../../application/usecases/auth/LoginUseCase";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher";
import { JwtService } from "../services/JwtService";

export function makeAuthController(): AuthController {
    const userRepository = new PrismaUserRepository();
    const passwordHasher = new BcryptPasswordHasher();
    const jwtService = new JwtService();
    const loginUseCase = new LoginUseCase(
        userRepository,
        passwordHasher,
        jwtService
    );

    return new AuthController(loginUseCase);
}