import { type Request, type Response } from "express";
import { TransferUseCase } from "../../../../application/usecases/transactions/TransferUseCase";
import { AuthorizationError } from "../../../../domain/exceptions/AuthorizationError";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";
import { Logger } from "../../../../utils/Logger";

export class TransferController {
    constructor(private readonly transferUseCase: TransferUseCase) {}

    async handle(req: Request, res: Response) {
        try {
            const { toAccountNumber, amount } = req.body;

            const account = await this.transferUseCase.execute(
                req.userId,
                toAccountNumber,
                amount
            );

            await Logger.info("Transferencia realizada", req.originalUrl);

            return res.status(200).json({
                message: "Transferencia Efetuada com SUCESSO!",
                account: {
                    accountNumber: account.accountNumber,
                    balance: account.balance
                }
            });
        } catch (error) {
            await Logger.error(error, req.originalUrl);

            if (error instanceof AuthorizationError) {
                return res.status(403).json({
                    message: error.message
                });
            }

            if (error instanceof BusinessError) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message: "Erro interno no servidor"
            });
        }
    }
}
