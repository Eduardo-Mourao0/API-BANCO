import { Router } from "express";

import { UserController } from "./modules/users/controllers/UserController";
import { DepositController } from "./modules/transactions/controllers/DepositController";
import { ListUserController } from "./modules/users/controllers/ListUserController";
import { WithdrawController } from "./modules/transactions/controllers/WithdrawController";
import { TransferController } from "./modules/transactions/controllers/TransferController";
import { DeleteController } from "./modules/users/controllers/DeleteController";

const router = Router();

const userController = new UserController();
const depositController = new DepositController();
const withdrawController = new WithdrawController();
const transferController = new TransferController();
const listUserController = new ListUserController();
const deleteController = new DeleteController();

router.post("/users", (req, res) => userController.create(req, res));
router.post("/deposit", (req, res) => depositController.handle(req, res));
router.post("/withdraw", (req, res) => withdrawController.handle(req, res));
router.post("/transfer", (req, res) => transferController.handle(req, res));

router.get("/list", (req, res) => listUserController.handle(req, res));

router.delete("/delete/:accountNumber", (req, res) => deleteController.handle(req, res));

export { router };