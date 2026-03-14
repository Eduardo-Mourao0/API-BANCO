import { type Request, type Response } from "express";
import { TransferUseCase } from "../usecases/TransferUseCase";
import { prismaTransactionRepository } from "../repositories/prismaRepository";

export class TransferController{
    async handle(req: Request, res: Response){

        try{

            const {fromAccount, toAccount, amount} = req.body;
        
            const transactionRepository = new prismaTransactionRepository()
            const transferUseCase = new TransferUseCase(transactionRepository)
            
            const result = await transferUseCase.execute(
                toAccount,
                fromAccount,
                amount
            );

            return res.status(200).json({
                message: 'Transferencia Efetuada com SUCESSO! ✅',
                Comprovante: result
            })
        
        }catch(error){

            if (error instanceof Error) {
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