import { type Request, type Response } from "express";
import { ListUsersUseCase } from "../usecases/ListUserUseCase";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { Logger } from "../../../utils/Logger";

export class ListUserController{
    async handle(req: Request, res: Response){

        try{

            const userRepository = new PrismaUserRepository()
        
            const listUsersUseCase = new ListUsersUseCase(userRepository)
            
            const list = await listUsersUseCase.execute()

            await Logger.info("Listar Usuarios", req.originalUrl);

            return res.status(200).json(list)
        
        }catch(error){

            await Logger.error(error, req.originalUrl);

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