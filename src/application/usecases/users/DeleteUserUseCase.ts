import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
export class DeleteUserUseCase{
    constructor(
        private userRepository: IUserRepository,
        private accountRepository: IAccountRepository
    ){}
    
    async execute(cpf: string){
        
        const userData = await this.userRepository.findByCpf(cpf);

        if(!userData){
            throw new BusinessError('Usuario não encontrado!')
        }
        
        const accountData = await this.accountRepository.findAccount(userData.accountNumber);

        if(!accountData){
            throw new BusinessError("Conta do usuario nao encontrada!")
        }

        const user = new User(
            userData.name,
            userData.cpf,
            userData.email,
            userData.password,
            userData.accountNumber
        )

        user.canDelete(accountData.balance);

        await this.accountRepository.deleteAccount(accountData.accountNumber);

        await this.userRepository.deleteAccount(cpf);

        return {
            message: 'Usuario e Conta DELETADOS com SUCESSO! ✅'
        };
    }
}