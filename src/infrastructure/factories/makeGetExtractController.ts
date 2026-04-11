import { GetExtractController } from "../presentation/controllers/transactions/GetExtractController";
import { GetExtractUseCase } from "../../application/usecases/transactions/GetExtractUseCase";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";

export function makeGetExtractController(): GetExtractController {
    const accountRepository = new PrismaAccountRepository();
    const transactionRepository = new PrismaTransactionRepository();
    const getExtractUseCase = new GetExtractUseCase(transactionRepository, accountRepository);

    return new GetExtractController(getExtractUseCase);
}