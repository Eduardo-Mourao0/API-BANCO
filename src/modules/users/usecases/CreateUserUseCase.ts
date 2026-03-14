import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { IUserRepository } from "../repositories/IUserRepository";


export class CreateUserUseCase{
    
    constructor(private userRepository: IUserRepository){}
    
    async execute(data: CreateUserDTO){

        let accountNumber = "";
        let accountExist = true;
        let attempts = 0;

        const { name, cpf, email, password } = data;

        while(accountExist && attempts < 10){

            attempts++;

            accountNumber = Math.floor(100000 + Math.random() * 900000).toString();

            const account = await this.userRepository.findAccount(accountNumber);

            if(!account){
                accountExist = false;
            }
        }

        if(accountExist){
            throw new Error("Não foi possível gerar número de conta");
        }

        const userJaExiste = await this.userRepository.findByCpfOrEmail(cpf,email);

        if (userJaExiste){
            throw new Error('CPF ou Email já cadastrado!');
        }
        
        const user = await this.userRepository.create({
                name,
                cpf,
                email,
                password,
                accountNumber
            });

        return user;
    }
}