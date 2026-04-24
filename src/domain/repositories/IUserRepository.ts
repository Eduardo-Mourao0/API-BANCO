import { User } from "../entities/User";
import { Account } from "../entities/Account";

export interface UserDTO{
    id: string;
    name: string;
    cpf: string;
    email: string;
    password?: string;
    accountNumber: string;
}

export interface IUserRepository {
    
    findByCpfOrEmail(cpf?: string, email?: string): Promise<User | null>;

    findByCpf(cpf: string): Promise<User | null>;
    
    create(user: User): Promise<void>;

    findAll(): Promise<User[]>;

    delete(cpf: string): Promise<void>;

    findById(id: string): Promise<User | null>;
}