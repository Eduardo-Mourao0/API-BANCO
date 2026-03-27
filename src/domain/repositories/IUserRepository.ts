import { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import { AccountDTO } from "../../application/dtos/AccountDTO";

export interface UserDTO{
    name: string;
    cpf: string;
    email: string;
    password: string;
    accountNumber: string;
}

export interface IUserRepository {
    
    findByCpfOrEmail(cpf: string, email: string): Promise<any>;

    findByCpf(cpf: string): Promise<UserDTO | null>;
    
    create(userData: CreateUserDTO): Promise<UserDTO>;

    findAll(): Promise<any[]>;

    findAccount(accountNumber: string): Promise<AccountDTO | null>;

    deleteAccount(cpf: string): Promise<void>;
}