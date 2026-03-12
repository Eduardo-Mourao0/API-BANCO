import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { IUserRepository } from "../repositories/IUserRepository";


export class CreateUserUseCase{
    
    constructor(private userRepository: IUserRepository){}
    
    async execute(data: CreateUserDTO){

        const { name, cpf, email, password } = data;

        const generatedAccountNumber = Math.floor(10000 + Math.random() * 90000).toString();

        const userJaExiste = await this.userRepository.findByCpfOrEmail(cpf,email);

        if (userJaExiste){
            throw new Error('CPF ou Email já cadastrado!');
        }
        
        const user = await this.userRepository.create({
                name,
                cpf,
                email,
                password,
                accountNumber: generatedAccountNumber
            });

        return user;
    }
}