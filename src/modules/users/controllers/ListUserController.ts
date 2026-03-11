import { type Request, type Response } from "express";
import { ListUsersUseCase } from "../usecase/ListUserUseCase";

export class ListUserController{
    async handle(req: Request, res: Response){
        
        const listUsersUseCase = new ListUsersUseCase()

        try{
            
            const list = await listUsersUseCase.execute()

            return res.status(200).json(list)
        }catch(error){

            if(error instanceof Error){
                return res.status(400).json({
                    message: error.message
                })
            }

            return res.status(500).json({
            message: "Erro interno"
            })
        }
    }
}