import { ITransactionReporitory } from "../repositories/ITransactionRepository";

export class TransferUseCase{
    constructor(private transactionsRepository: ITransactionReporitory){}

    async execute(fromAccount: string, toAccount:string, amount: number){

        const sender = await this.transactionsRepository.findAccount(fromAccount)

        const receiver = await this.transactionsRepository.findAccount(toAccount)

        if (!sender) {
            throw new Error("Conta de origem não encontrada");
        }

        if (!receiver) {
            throw new Error("Conta de destino não encontrada");
        }

        if(fromAccount === toAccount){
            throw new Error('Nao e possivel fazer transferencia para a MESMA conta! ❌');
        }

        if(amount <= 0){
            throw new Error('O valor precisa ser MAIOR que 0');
        }

        if(sender.balance.toNumber() < amount){
            throw new Error("Saldo insuficiente");
        }

        await this.transactionsRepository.transfer(fromAccount, toAccount, amount)

        const COMPROVANTE = {
            Id: crypto.randomUUID(),
            type: "TRANSFER",
            fromAccount: fromAccount,
            toAccount: toAccount,
            amount: amount,
            updatedAt: true,
            status: "SUCCESS"
        };

        return COMPROVANTE;
        
    }
}