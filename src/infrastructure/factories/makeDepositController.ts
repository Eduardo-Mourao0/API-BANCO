import { DepositController } from "../presentation/controllers/transactions/DepositController";
import { DepositUseCase } from "../../application/usecases/transactions/DepositUseCase";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";

export function makeDepositController(): DepositController {

    const transactionRepository = new PrismaTransactionRepository();
    const depositUseCase = new DepositUseCase(transactionRepository);
  
    return new DepositController(depositUseCase);
}