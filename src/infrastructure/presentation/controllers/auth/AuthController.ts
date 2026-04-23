import { Request, Response } from "express";
import { LoginUseCase } from "../../../../application/usecases/auth/LoginUseCase";

export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) {}

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const result = await this.loginUseCase.execute({ email, password });

        res.status(200).json(result);
    }
}