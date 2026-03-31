import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { Account } from "../../../domain/entities/Account";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
 
export class TransferUseCase {
    constructor(private transactionRepository: ITransactionRepository) {}
 
    async execute(fromAccountNumber: string, toAccountNumber: string, amount: number) {
        
        const [fromData, toData] = await Promise.all([
            this.transactionRepository.findAccount(fromAccountNumber),
            this.transactionRepository.findAccount(toAccountNumber)
        ]);
 
        if (!fromData) throw new BusinessError("Conta de origem não encontrada.");
        
        if (!toData) throw new BusinessError("Conta de destino não encontrada.");
 
        const fromAccount = new Account(
            fromData.accountNumber, 
            fromData.balance
        );
        
        const toAccount = new Account(
            toData.accountNumber, 
            toData.balance
        );
 
        fromAccount.transfer(amount, toAccount);
 
        await this.transactionRepository.transfer(
            fromAccount.accountNumber,
            toAccount.accountNumber,
            fromAccount.balance,
            toAccount.balance
        );

        await this.transactionRepository.saveTransaction(fromAccount.accountNumber, "TRANSFER", amount);
        await this.transactionRepository.saveTransaction(toAccount.accountNumber, "DEPOSIT", amount);

        return {
            fromAccount: fromAccount.accountNumber,
            toAccount: toAccount.accountNumber,
            amount,
            date: new Date()
        };
    }
}