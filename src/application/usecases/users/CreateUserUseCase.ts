import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { v4 as uuidv4 } from "uuid";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(data: CreateUserDTO) {
        const {name, cpf, email, password} = data;

        const userAlreadyExist = await this.userRepository.findByCpfOrEmail(cpf, email);

        if(userAlreadyExist){
            throw new BusinessError("CPF ou email ja cadastrado.");
        }

        const accountNumber = uuidv4();

        const user = new User(name, cpf, email, password, accountNumber)

        await user.hashPassword();

        return await this.userRepository.create({
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.passaword,
            accountNumber: user.accountNumber
        });
    }
}