import { ITransactionReporitory } from "../repositories/ITransactionRepository";

export class WithdrawUseCase{
    constructor(private transactionReposity: ITransactionReporitory){}
    
    async execute(accountNumber: string, amount: number){

        const account = await this.transactionReposity.findAccount(accountNumber);

        if(!account){
            throw new Error("Conta nao encontrada!")
        }
        
        if(amount <= 0){
            throw new Error('Valor precisa ser MAIOR que 0!');
        }
        
        if(account.balance.toNumber() < amount){
            throw new Error('Saldo insuficiente!')
        }

        await this.transactionReposity.withdraw(accountNumber, amount);

        return {message: 'Saque realizado com SUCESSO ✅'}
    }
}