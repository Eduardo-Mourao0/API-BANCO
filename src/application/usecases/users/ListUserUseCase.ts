import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class ListUsersUseCase{
    
    constructor(private userRepository: IUserRepository){}
    
    async execute(){

        return await this.userRepository.findAll();
    }
}