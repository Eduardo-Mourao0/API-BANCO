import { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import { AccountDTO } from "../../application/dtos/AccountDTO";

export interface UserDTO{
    id: string;
    name: string;
    cpf: string;
    email: string;
    password?: string;
    accountNumber: string;
}

export interface IUserRepository {
    
    findByCpfOrEmail(cpf: string, email: string): Promise<UserDTO | null>;

    findByCpf(cpf: string): Promise<UserDTO | null>;
    
    create(userData: CreateUserDTO): Promise<UserDTO>;

    findAll(): Promise<UserDTO[]>;

    delete(cpf: string): Promise<void>;
}