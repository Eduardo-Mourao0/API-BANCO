import { type Request, type Response } from "express";
import { GetExtractUseCase } from "../../../../application/usecases/transactions/GetExtractUseCase";
import { Logger } from "../../../../utils/Logger";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";

export class GetExtractController {
    constructor(private getExtractUseCase: GetExtractUseCase) {}

    async handle(req: Request, res: Response) {
        try {

            const accountNumber = req.params.accountNumber as string;

            const transactions = await this.getExtractUseCase.execute(accountNumber);

            await Logger.info("Extrato consultado com sucesso", req.originalUrl);

            return res.status(200).json({
                message: "Extrato consultado com sucesso",
                extract: transactions.map(t => ({
                    id: t.id,
                    type: t.type,
                    amount: t.amount,
                    date: t.createdAt,
                })),
            });
        } catch (error) {
            await Logger.error(error, req.originalUrl);

            if (error instanceof BusinessError) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erro interno", 
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}