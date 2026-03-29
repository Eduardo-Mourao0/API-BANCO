import { type Request, type Response } from "express";
import { DeleteUserUseCase } from "../../../../application/usecases/users/DeleteUserUseCase";
import { Logger } from "../../../../utils/Logger";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";

export class DeleteController{
    constructor(private deleteUser: DeleteUserUseCase){}
    async handle(req: Request<{ accountNumber: string }>, res: Response){

        const {accountNumber} = req.params;

        try{

            await this.deleteUser.execute(accountNumber);

            await Logger.info("Usuário Deletado", req.originalUrl);

            return res.status(200).json({message: "Usuário Deletado com Sucesso"})
        
        }catch(error){

            await Logger.error(error, req.originalUrl);
            
            if(error instanceof BusinessError){
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