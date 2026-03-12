import { IUserRepository } from "../repositories/IUserRepository";


export class DeleteUserUseCase{
    constructor(private userRepository: IUserRepository){}
    
    async execute(accountNumber: string){
        
        const account = await this.userRepository.findAccount(accountNumber);

        if(!account){
            throw new Error('Conta não encontrada')
        }
        
        if(account.balance.toNumber() > 0){
            throw new Error("Sua conta bancaria precisa estar com o balance ZERADO!")
        }

        await this.userRepository.deleteAccount(accountNumber)

        return {
            message: 'Usuario e Conta DELETADOS com SUCESSO! ✅'
        };
    }
}