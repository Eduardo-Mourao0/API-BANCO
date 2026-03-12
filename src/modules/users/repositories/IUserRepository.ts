import { CreateUserDTO } from "../dtos/CreateUserDTO";

export interface IUserRepository {
    
    findByCpfOrEmail(cpf: string, email: string): Promise<any>;
    
    create(userData: CreateUserDTO): Promise<any> 

    listUsers(): Promise<any[]>
}