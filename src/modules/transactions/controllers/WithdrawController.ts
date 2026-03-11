import { Request, Response } from "express";
import { WithdrawUseCase } from "../usecases/WithdrawUseCase";

export class WithdrawController{
    async handle(req: Request, res: Response){
        try{
            
            const { accountNumber, amount} = req.body;

            const withdrawUseCase = new WithdrawUseCase()

            const result = await withdrawUseCase.execute({
                accountNumber,
                amount: Number(amount)
            });

            return res.status(200).json({
                message: 'Saque efetuado com SUCESSO! ✅',
                account: result
            })
       
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