import { TransferUseCase } from "../../application/usecases/transactions/TransferUseCase";
import { PrismaTransactionManager } from "../managers/PrismaTransactionManager";
import { TransferController } from "../presentation/controllers/transactions/TransferController";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";

export function makeTransferController(): TransferController {
    const accountRepository = new PrismaAccountRepository();
    const transactionRepository = new PrismaTransactionRepository();
    const transactionManager = new PrismaTransactionManager();
    const userRepository = new PrismaUserRepository();
    const transferUseCase = new TransferUseCase(
        transactionManager,
        accountRepository,
        transactionRepository,
        userRepository
    );

    return new TransferController(transferUseCase);
}
