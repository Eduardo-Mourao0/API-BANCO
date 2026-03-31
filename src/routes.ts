import { Router } from "express";
 
import { makeCreateUserController } from "./infrastructure/factories/makeCreateUserController";
import { makeListUsersController } from "./infrastructure/factories/makeListUserController";
import { makeDeleteUserController } from "./infrastructure/factories/makeDeleteUserController";
import { makeDepositController } from "./infrastructure/factories/makeDepositController";
import { makeWithdrawController } from "./infrastructure/factories/makeWithdrawController";
import { makeTransferController } from "./infrastructure/factories/makeTransferController";
 
const router = Router();
 
router.post("/users", (req, res) => makeCreateUserController().create(req, res));
router.get("/users", (req, res) => makeListUsersController().handle(req, res));
router.delete("/users/:cpf", (req, res) => makeDeleteUserController().handle(req, res));
 
router.post("/deposit", (req, res) => makeDepositController().handle(req, res));
router.post("/withdraw", (req, res) => makeWithdrawController().handle(req, res));
router.post("/transfer", (req, res) => makeTransferController().handle(req, res));
 
export { router };