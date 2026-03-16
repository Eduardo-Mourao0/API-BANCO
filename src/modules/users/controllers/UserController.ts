import { type Request, type Response } from "express";
import { CreateUserUseCase } from "../usecases/CreateUserUseCase";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { saveLog } from "../../../saveLog";

export class UserController{
    async create(req:Request, res: Response){
        try{

            const userRepository = new PrismaUserRepository();
            
            const createUserUseCase = new CreateUserUseCase(userRepository);
            
            const user = await createUserUseCase.execute(req.body);

            return res.status(201).json({
                message: 'Conta criada com SUCESSO! ✅',
                user: user
            });
        
        }catch (error) {
            console.log(error)

            await saveLog(error, req.originalUrl);

            if (error instanceof Error) {
                return res.status(400).json({
                error: error.message
                })
            }

            return res.status(500).json({
                error: "Erro interno"
            })
        }

    };
}