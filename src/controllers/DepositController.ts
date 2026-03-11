import { type Request, type Response } from "express";
import { DepositUseCase } from "../usecases/DepositUseCase";

export class DepositController{
    async handle(req: Request, res: Response){

        const {accountNumber, amount} = req.body

        const depositUseCase = new DepositUseCase()

        try{

            const deposito = await depositUseCase.execute({
                accountNumber, 
                amount: Number(amount)
            })

            return res.status(200).json({
                message: 'Deposito efetuado com SUCESSO! ✅',
                account: deposito
            })
        
        }catch (error:any){
           
            return res.status(400).json({
                message: error.message
            })
        }
    }

}