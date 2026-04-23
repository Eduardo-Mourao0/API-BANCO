import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";
import { IJwtService } from "../../../domain/services/IJwtService";
import { LoginDto, LoginResponseDto } from "../../dtos/auth/LoginDto";

export class LoginUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly jwtService: IJwtService
    ) {}

    async execute(dto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.userRepository.findByCpfOrEmail(undefined, dto.email);

        if (!user) {
            throw new Error("Credenciais inválidas");
        }

        const isValid = await this.passwordHasher.compare(dto.password, user.password);

        if (!isValid) {
            throw new Error("Credenciais inválidas");
        }

        const token = this.jwtService.sign({ userId: user.id });

        return { token };
    }
}