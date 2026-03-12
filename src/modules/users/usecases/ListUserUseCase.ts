import { IUserRepository } from "../repositories/IUserRepository";

export class ListUsersUseCase{
    
    constructor(private userRepository: IUserRepository){}
    
    async execute(){

        const users = await this.userRepository.listUsers();

        return users;
    
    }
}