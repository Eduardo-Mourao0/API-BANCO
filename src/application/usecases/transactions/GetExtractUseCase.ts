import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { BusinessError } from "../../../domain/exceptions/BusinessError";

export class GetExtractUseCase {
    constructor(private transactionRepository: ITransactionRepository) {}

    async execute(accountNumber: string) {
        const account = await this.transactionRepository.findAccount(accountNumber);

        if (!account) {
            throw new BusinessError("Conta não encontrada");
        }

        return this.transactionRepository.findTransactionsByAccount(accountNumber);
    }
}