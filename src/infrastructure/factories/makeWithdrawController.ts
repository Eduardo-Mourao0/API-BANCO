import { WithdrawController } from "../presentation/controllers/transactions/WithdrawController";
import { WithdrawUseCase } from "../../application/usecases/transactions/WithdrawUseCase";
import { PrismaTransactionManager } from "../managers/PrismaTransactionManager";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";

export function makeWithdrawController(): WithdrawController {
    const accountRepository = new PrismaAccountRepository();
    const transactionRepository = new PrismaTransactionRepository();
    const transactionManager = new PrismaTransactionManager();
    const withdrawUseCase = new WithdrawUseCase(
        transactionManager,
        accountRepository,
        transactionRepository
    );

    return new WithdrawController(withdrawUseCase);
}
