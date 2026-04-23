import { Router, Request } from "express";

import { makeCreateUserController } from "./infrastructure/factories/makeCreateUserController";
import { makeListUsersController } from "./infrastructure/factories/makeListUserController";
import { makeDeleteUserController } from "./infrastructure/factories/makeDeleteUserController";
import { makeDepositController } from "./infrastructure/factories/makeDepositController";
import { makeWithdrawController } from "./infrastructure/factories/makeWithdrawController";
import { makeTransferController } from "./infrastructure/factories/makeTransferController";
import { makeGetExtractController } from "./infrastructure/factories/makeGetExtractController";
import { makeAuthController } from "./infrastructure/factories/AuthControllerFactory";
import { authMiddleware } from "./infrastructure/presentation/middlewares/AuthMiddleware";

const router = Router();

// Auth
router.post("/auth/login", (req, res) => makeAuthController().login(req, res));

// Users
router.post("/users", (req, res) => makeCreateUserController().create(req, res));
router.get("/users", authMiddleware, (req, res) => makeListUsersController().handle(req, res));
router.delete("/users/:cpf", authMiddleware, (req: Request<{ cpf: string }>, res) => makeDeleteUserController().handle(req, res));

// Transactions
router.post("/deposit", authMiddleware, (req, res) => makeDepositController().handle(req, res));
router.post("/withdraw", authMiddleware, (req, res) => makeWithdrawController().handle(req, res));
router.post("/transfer", authMiddleware, (req, res) => makeTransferController().handle(req, res));
router.get("/extract/:accountNumber", authMiddleware, (req, res) => makeGetExtractController().handle(req, res));

export { router };