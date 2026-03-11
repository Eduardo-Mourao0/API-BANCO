import { type Request, type Response } from "express";
import { TransferUseCase } from "../usecases/TransferUseCase";

export class TransferController{
    async handle(req: Request, res: Response){

        const {fromAccount, toAccount, amount} = req.body;
        
        const transferUseCase = new TransferUseCase()

        try{
            
            const transfer = await transferUseCase.execute({
                toAccount,
                fromAccount,
                amount: Number(amount)
            });

            return res.status(200).json({
                message: 'Transferencia Efetuada com SUCESSO! ✅',
                Comprovante: transfer
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