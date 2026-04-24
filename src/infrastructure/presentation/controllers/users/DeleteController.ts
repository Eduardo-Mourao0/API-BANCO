import { type Request, type Response } from "express";
import { DeleteUserUseCase } from "../../../../application/usecases/users/DeleteUserUseCase";
import { AuthorizationError } from "../../../../domain/exceptions/AuthorizationError";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";
import { Logger } from "../../../../utils/Logger";

export class DeleteController {
    constructor(private readonly deleteUser: DeleteUserUseCase) {}

    async handle(req: Request, res: Response) {
        try {
            await this.deleteUser.execute(req.userId);

            await Logger.info("Usuario Deletado", req.originalUrl);

            return res.status(200).json({ message: "Usuario Deletado com Sucesso" });
        } catch (error) {
            await Logger.error(error, req.originalUrl);

            if (error instanceof AuthorizationError) {
                return res.status(403).json({
                    error: error.message
                });
            }

            if (error instanceof BusinessError) {
                return res.status(400).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro Interno."
            });
        }
    }
}
