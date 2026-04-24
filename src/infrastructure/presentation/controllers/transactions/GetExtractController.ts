import { type Request, type Response } from "express";
import { GetExtractUseCase } from "../../../../application/usecases/transactions/GetExtractUseCase";
import { AuthorizationError } from "../../../../domain/exceptions/AuthorizationError";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";
import { Logger } from "../../../../utils/Logger";

export class GetExtractController {
    constructor(private readonly getExtractUseCase: GetExtractUseCase) {}

    async handle(req: Request, res: Response) {
        try {
            const transactions = await this.getExtractUseCase.execute(req.userId);

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

            if (error instanceof AuthorizationError) {
                return res.status(403).json({ message: error.message });
            }

            if (error instanceof BusinessError) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({
                message: "Erro interno",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}
