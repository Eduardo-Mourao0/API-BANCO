import { Router } from "express";

import { UserController } from "./infrastructure/presentation/controllers/users/controllers/UserController";
import { DepositController } from "./infrastructure/presentation/controllers/DepositController";
import { ListUserController } from "./infrastructure/presentation/controllers/users/controllers/ListUserController";
import { WithdrawController } from "./infrastructure/presentation/controllers/WithdrawController";
import { TransferController } from "./infrastructure/presentation/controllers/TransferController";
import { DeleteController } from "./infrastructure/presentation/controllers/users/DeleteController";

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