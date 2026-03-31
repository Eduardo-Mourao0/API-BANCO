import { type Request, type Response } from "express";
import { CreateUserUseCase } from "../../../../application/usecases/users/CreateUserUseCase";
import { Logger } from "../../../../utils/Logger";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";

export class UserController{
    constructor(private createUserUseCase: CreateUserUseCase){}
    async create(req:Request, res: Response){
        try{
            
            const account = await this.createUserUseCase.execute(req.body);

            await Logger.info("Usuário criado", req.originalUrl);

            return res.status(201).json({
                message: 'Conta criada com SUCESSO! ✅',
                account: {
                    name: account.name,
                    cpf: account.cpf,
                    email: account.email,
                    accountNumber: account.accountNumber
                }
            });
        
        }catch (error) {
            
            console.log(error)

            await Logger.error(error, req.originalUrl);

            if (error instanceof BusinessError) {
                return res.status(400).json({
                error: error.message
                })
            }

            return res.status(500).json({
                error: "Erro interno"
            })
        }
    }
}