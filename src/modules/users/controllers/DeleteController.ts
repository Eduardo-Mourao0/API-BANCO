import { type Request, type Response } from "express";
import { DeleteUserUseCase } from "../usecase/DeleteUserUseCase";

export class DeleteController{
    async handle(req: Request, res: Response){

        const {accountNumber} = req.body;
        
        const deleteUser = new DeleteUserUseCase();

        try{

            const del = await deleteUser.execute({
                accountNumber
            });

            return res.status(200).json(del)
        
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