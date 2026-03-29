import { type Request, type Response } from "express";
import { DepositUseCase } from "../../../../application/usecases/transactions/DepositUseCase";
import { Logger } from "../../../../utils/Logger";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";

export class DepositController{
    constructor(private depositUsecase: DepositUseCase){}

    async handle(req: Request, res: Response){

        try{

            const {accountNumber, amount} = req.body

            
            const receipt = await this.depositUsecase.execute(accountNumber, amount);

            await Logger.info("Deposito Efetuado com Sucesso", req.originalUrl);

            return res.status(200).json({message: "Deposito Efetuado com Sucesso",
                receipt: {
                    accountNumber: receipt.accountNumber,
                    amount: receipt.amount,
                    balance: receipt.balance,
                    date: receipt.date
                }
            });
        
        }catch (error){

            await Logger.error(error, req.originalUrl);
           
            if(error instanceof BusinessError){
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