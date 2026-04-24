import { Request, Response } from "express";
import { LoginUseCase } from "../../../../application/usecases/auth/LoginUseCase";
import { AuthenticationError } from "../../../../domain/exceptions/AuthenticationError";
import { Logger } from "../../../../utils/Logger";

export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const result = await this.loginUseCase.execute({ email, password });

            await Logger.info("Login efetuado com sucesso", req.originalUrl);

            res.status(200).json(result);
        } catch (error) {
            await Logger.error(error, req.originalUrl);

            if (error instanceof AuthenticationError) {
                res.status(401).json({ message: error.message });
                return;
            }

            res.status(500).json({ message: "Erro interno" });
        }
    }
}
