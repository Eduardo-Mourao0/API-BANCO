import express from 'express';
import { UserController } from './controllers/UserController';
import { DepositController } from './controllers/DepositController';
import { ListUserController } from './controllers/ListUserController';
import { WithdrawController } from './controllers/WithdrawController';
import { TransferController } from './controllers/TransferController';
import { DeleteController } from './controllers/DeleteController';

const app = express();

app.use(express.json());

const userController = new UserController();
const depositController = new DepositController();
const withdrawController = new WithdrawController();
const transferController = new TransferController();
const listUserController = new ListUserController();
const deleteController = new DeleteController();

app.post('/users', (req, res) => userController.create(req, res));
app.post('/deposit', (req, res) => depositController.handle(req, res));
app.post('/withdraw', (req, res) => withdrawController.handle(req, res));
app.post('/transfer', (req, res) => transferController.handle(req, res));

app.get('/users', (req, res) => listUserController.handle(req, res));

app.delete('/delete', (req, res) => deleteController.handle(req, res));


const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Servidor ON na porta http://localhost:${PORT} 🚀`);
});