import { type Request, type Response } from "express";
import { ListUsersUseCase } from "../../../../application/usecases/users/ListUserUseCase";
import { Logger } from "../../../../utils/Logger";
import { BusinessError } from "../../../../domain/exceptions/BusinessError";

export class ListUserController {
    constructor(private listUsersUseCase: ListUsersUseCase) {}

    async handle(req: Request, res: Response) {
        try {
            const users = await this.listUsersUseCase.execute();

            await Logger.info("Listar Usuarios", req.originalUrl);

            return res.status(200).json({
                message: "Lista de Usuarios",
                ListUsers: users.map(user => ({
                    id: user.id,
                    name: user.name,
                    cpf: user.cpf,
                    email: user.email,
                    accountNumber: user.accountNumber
                }))
            });

        } catch (error) {
            await Logger.error(error, req.originalUrl);

            if (error instanceof BusinessError) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erro interno" });
        }
    }
}