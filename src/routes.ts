import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { DepositController } from "./controllers/DepositController";
import { ListUserController } from "./controllers/ListUserController";
import { WithdrawController } from "./controllers/WithdrawController";
import { TransferController } from "./controllers/TransferController";
import { DeleteController } from "./controllers/DeleteController";

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

router.get("/users", (req, res) => listUserController.handle(req, res));

router.delete("/delete", (req, res) => deleteController.handle(req, res));

export { router };