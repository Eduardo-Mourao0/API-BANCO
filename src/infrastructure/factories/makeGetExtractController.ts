import { GetExtractController } from "../presentation/controllers/transactions/GetExtractController";
import { GetExtractUseCase } from "../../application/usecases/transactions/GetExtractUseCase";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";

export function makeGetExtractController(): GetExtractController {
    
    const transactionRepository = new PrismaTransactionRepository();
    const getExtractUseCase = new GetExtractUseCase(transactionRepository);

    return new GetExtractController(getExtractUseCase);
}