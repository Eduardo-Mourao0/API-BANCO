import { WithdrawUseCase } from "../../application/usecases/transactions/WithdrawUseCase";
import { PrismaTransactionManager } from "../managers/PrismaTransactionManager";
import { WithdrawController } from "../presentation/controllers/transactions/WithdrawController";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";

export function makeWithdrawController(): WithdrawController {
    const accountRepository = new PrismaAccountRepository();
    const transactionRepository = new PrismaTransactionRepository();
    const transactionManager = new PrismaTransactionManager();
    const userRepository = new PrismaUserRepository();
    const withdrawUseCase = new WithdrawUseCase(
        transactionManager,
        accountRepository,
        transactionRepository,
        userRepository
    );

    return new WithdrawController(withdrawUseCase);
}
