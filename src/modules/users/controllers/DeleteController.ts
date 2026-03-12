import { type Request, type Response } from "express";
import { DeleteUserUseCase } from "../usecases/DeleteUserUseCase";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";

export class DeleteController{
    async handle(req: Request<{ accountNumber: string }>, res: Response){

        const {accountNumber} = req.params;

        const userRepository = new PrismaUserRepository();
        
        const deleteUser = new DeleteUserUseCase(userRepository);

        try{

            const del = await deleteUser.execute(accountNumber);

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