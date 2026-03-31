import { TransferController } from "../presentation/controllers/transactions/TransferController";
import { TransferUseCase } from "../../application/usecases/transactions/TransferUseCase";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";

export function makeTransferController(): TransferController {
    
    const transactionRepository = new PrismaTransactionRepository();
    const transferUseCase = new TransferUseCase(transactionRepository);
    
    return new TransferController(transferUseCase);
}