import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { BusinessError } from "../../../domain/exceptions/BusinessError";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";

export class GetExtractUseCase {
    constructor(
        private transactionRepository: ITransactionRepository,
        private accountRepository: IAccountRepository
    ) {}

    async execute(accountNumber: string) {
        const account = await this.accountRepository.findAccount(accountNumber);

        if (!account) {
            throw new BusinessError("Conta não encontrada");
        }

        return this.transactionRepository.findByAccount(accountNumber);
    }
}