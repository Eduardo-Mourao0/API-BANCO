import { DepositUseCase } from "../../application/usecases/transactions/DepositUseCase";
import { PrismaTransactionManager } from "../managers/PrismaTransactionManager";
import { DepositController } from "../presentation/controllers/transactions/DepositController";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";

export function makeDepositController(): DepositController {
    const accountRepository = new PrismaAccountRepository();
    const transactionRepository = new PrismaTransactionRepository();
    const transactionManager = new PrismaTransactionManager();
    const userRepository = new PrismaUserRepository();
    const depositUseCase = new DepositUseCase(
        transactionManager,
        accountRepository,
        transactionRepository,
        userRepository
    );

    return new DepositController(depositUseCase);
}
