import { GetExtractUseCase } from "../../application/usecases/transactions/GetExtractUseCase";
import { GetExtractController } from "../presentation/controllers/transactions/GetExtractController";
import { PrismaAccountRepository } from "../repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../repositories/PrismaTransactionRepository";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";

export function makeGetExtractController(): GetExtractController {
    const accountRepository = new PrismaAccountRepository();
    const transactionRepository = new PrismaTransactionRepository();
    const userRepository = new PrismaUserRepository();
    const getExtractUseCase = new GetExtractUseCase(
        transactionRepository,
        accountRepository,
        userRepository
    );

    return new GetExtractController(getExtractUseCase);
}
