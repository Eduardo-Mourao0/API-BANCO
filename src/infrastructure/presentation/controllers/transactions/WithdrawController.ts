import { Request, Response } from "express";
import { WithdrawUseCase } from "../../../../application/usecases/transactions/WithdrawUseCase";
import { Logger } from "../../../../utils/Logger";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";

export class WithdrawController {
    constructor(private withdrawUseCase: WithdrawUseCase) {}
    
    async handle(req: Request, res: Response) {
        try {
            const { accountNumber, amount } = req.body;

            const account = await this.withdrawUseCase.execute(
                accountNumber,
                amount
            );

            await Logger.info("Saque Efetuado com Sucesso", req.originalUrl);

            return res.status(200).json({
                message: "Saque Efetuado com Sucesso",
                account: {
                    accountNumber: account.accountNumber,
                    balance: account.balance
                }
            });
        } catch (error) {
            await Logger.error(error, req.originalUrl);
            
            if (error instanceof BusinessError) {
                return res.status(400).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro Interno."
            });
        }
    }
}
