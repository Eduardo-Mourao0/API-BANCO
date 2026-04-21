import { TransferController } from "../presentation/controllers/transactions/TransferController";
import { TransferUseCase } from "../../application/usecases/transactions/TransferUseCase";
import { PrismaTransactionManager } from "../managers/PrismaTransactionManager";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";

export function makeTransferController(): TransferController {
    const accountRepository = new PrismaAccountRepository();
    const transactionRepository = new PrismaTransactionRepository();
    const transactionManager = new PrismaTransactionManager();
    const transferUseCase = new TransferUseCase(
        transactionManager,
        accountRepository,
        transactionRepository
    );

    return new TransferController(transferUseCase);
}
