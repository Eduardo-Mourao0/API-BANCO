import { WithdrawController } from "../presentation/controllers/transactions/WithdrawController";
import { WithdrawUseCase } from "../../application/usecases/transactions/WithdrawUseCase";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";

export function makeWithdrawController(): WithdrawController {
    
    const transactionRepository = new PrismaTransactionRepository();
    const withdrawUseCase = new WithdrawUseCase(transactionRepository);
    
    return new WithdrawController(withdrawUseCase);
}