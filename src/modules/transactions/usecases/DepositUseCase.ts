import { ITransactionReporitory } from "../repositories/ITransactionRepository"

export class DepositUseCase{
    constructor(private transactionReporitory: ITransactionReporitory){}

    async execute(accountNumber: string, amount: number){

       
        if(amount <= 0){
            throw new Error("Valor tem que ser MAIOR que 0.")
        }

        const accountExiste = await this.transactionReporitory.findAccount(accountNumber);

        if(!accountExiste){
            throw new Error("Conta NAO encontrada.")
        }

        await this.transactionReporitory.deposit(accountNumber, amount);

        return {message: 'Deposito realizado com SUCESSO ✅'}
    }
}