import { prisma } from "../../../prisma";

export class ListUsersUseCase{
    async execute(){

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                cpf: true,
                email: true,
                createdAt: true,
                
                account: {
                    select: {
                        id: true,
                        accountNumber: true,
                        balance: true,
                    }
                }
            }
        });

        return users;
    
    }
}