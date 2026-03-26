import { type Request, type Response } from "express";
import { DepositUseCase } from "../../../../application/usecases/transactions/DepositUseCase";
import { prismaTransactionRepository } from "../../../repositories/PrismaTransactionRepository";
import { Logger } from "../../../../utils/Logger";

export class DepositController{
    async handle(req: Request, res: Response){

        try{

            const {accountNumber, amount} = req.body

            const transactionRepository = new prismaTransactionRepository()

            const depositUseCase = new DepositUseCase(transactionRepository)

            const deposito = await depositUseCase.execute(
                accountNumber, 
                amount
            )

            await Logger.info("Deposito Efetuado com Sucesso", req.originalUrl);

            return res.status(200).json(deposito)
        
        }catch (error){

            await Logger.error(error, req.originalUrl);
           
            if(error instanceof Error){
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