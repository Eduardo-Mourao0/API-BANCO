import { type Request, type Response } from "express";
import { CreateUserUseCase } from "../usecase/CreateUserUseCase";

export class UserController{
    async create(req:Request, res: Response){
        try{

            const {name, cpf, email, password} = req.body;

            const createUserUseCase = new CreateUserUseCase();
            const user = await createUserUseCase.execute({name, cpf, email, password});

            res.status(201).json({
                message: 'Conta criada com SUCESSO! ✅',
                user: user
            });
        
        }catch (error) {
            console.log(error)

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