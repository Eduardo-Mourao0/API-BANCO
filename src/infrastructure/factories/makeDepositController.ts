import { DepositController } from "../presentation/controllers/transactions/DepositController";
import { DepositUseCase } from "../../application/usecases/transactions/DepositUseCase";
import { PrismaTransactionManager } from "../managers/PrismaTransactionManager";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";

export function makeDepositController(): DepositController {
    
    const accountRepository = new PrismaAccountRepository();
    const transactionRepository = new PrismaTransactionRepository();
    const transactionManager = new PrismaTransactionManager(accountRepository, transactionRepository);
    const depositUseCase = new DepositUseCase(transactionManager, accountRepository);

    return new DepositController(depositUseCase);
}