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
        
        const user = await this.userRepository.findByCpf(cpf);

        if(!user){
            throw new BusinessError('Usuario não encontrado!')
        }
        
        const accountData = await this.accountRepository.findAccount(user.accountNumber);

        if(!accountData){
            throw new BusinessError("Conta do usuario nao encontrada!")
        }

        user.canDelete(accountData.balance);

        await this.userRepository.delete(cpf);

        return {
            message: 'Usuario e Conta DELETADOS com SUCESSO! ✅'
        };
    }
}