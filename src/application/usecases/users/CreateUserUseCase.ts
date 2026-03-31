import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { v4 as uuidv4 } from "uuid";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(data: CreateUserDTO) {
        const { name, cpf, email, password } = data;

        const userAlreadyExists = await this.userRepository.findByCpfOrEmail(cpf, email);

        if (userAlreadyExists) {
            throw new BusinessError("CPF ou email já cadastrado.");
        }

        const id = uuidv4();
        const accountNumber = await this.generateAccountNumber();

        const user = new User(name, cpf, email, password, accountNumber);

        await user.hashPassword();

        await this.userRepository.create({
            id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
            accountNumber: user.accountNumber
        });

        return {
            id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            accountNumber: user.accountNumber
        };
    }

    private async generateAccountNumber(): Promise<string> {
        for (let attempts = 0; attempts < 10; attempts++) {
            const accountNumber = Math.floor(10000 + Math.random() * 90000).toString();
            const exists = await this.userRepository.findByCpfOrEmail(accountNumber, accountNumber);

            if (!exists) return accountNumber;
        }

        throw new BusinessError("Não foi possível gerar número de conta.");
    }
}