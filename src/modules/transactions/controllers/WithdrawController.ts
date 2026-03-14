import { Request, Response } from "express";
import { WithdrawUseCase } from "../usecases/WithdrawUseCase";
import { prismaTransactionRepository } from "../repositories/prismaRepository";

export class WithdrawController{
    async handle(req: Request, res: Response){
        try{
            
            const { accountNumber, amount} = req.body;

            const transactionRepository = new prismaTransactionRepository()
            
            const withdrawUseCase = new WithdrawUseCase(transactionRepository)

            const result = await withdrawUseCase.execute(
                accountNumber,
                amount
            );

            return res.status(200).json(result)
       
        }catch(error){
            
            if(error instanceof Error){
                return res.status(400).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: 'Erro Interno.'
            });
        }
    }
}