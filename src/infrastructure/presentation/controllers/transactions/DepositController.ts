import { type Request, type Response } from "express";
import { DepositUseCase } from "../../../../application/usecases/transactions/DepositUseCase";
import { AuthorizationError } from "../../../../domain/exceptions/AuthorizationError";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";
import { Logger } from "../../../../utils/Logger";

export class DepositController {
    constructor(private readonly depositUsecase: DepositUseCase) {}

    async handle(req: Request, res: Response) {
        try {
            const { amount } = req.body;

            const account = await this.depositUsecase.execute(req.userId, amount);

            await Logger.info("Deposito Efetuado com Sucesso", req.originalUrl);

            return res.status(200).json({
                message: "Deposito Efetuado com Sucesso",
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
                message: "Erro interno"
            });
        }
    }
}
