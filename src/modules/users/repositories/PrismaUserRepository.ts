import { IUserRepository } from "./IUserRepository";
import { prisma } from "../../../prisma";

export class PrismaUserRepository implements IUserRepository {
    
    async findByCpfOrEmail(cpf: string, email: string){
        return prisma.user.findFirst({
            where: {
                OR: [
                    {cpf},
                    {email}
                ]
            }
        });
    }

    async create(data:any){

        const {name, cpf, email, password, accountNumber} = data;

        return prisma.user.create({
            data: {
                name,
                cpf,
                email,
                password,
                account: {
                    create: {
                        accountNumber,
                        balance: 0
                    }
                }
            },
            include: {
                account: true
            }
        });
    }

    async listUsers(){
        return prisma.user.findMany({
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
    }

    async findAccount(accountNumber: string){
        return prisma.account.findUnique({ 
            where: { accountNumber },
            include: {
                user: true
            }
        });
    }

    async deleteAccount(accountNumber: string){

        const account = await prisma.account.findUnique({
            where: { accountNumber },
            include: { user: true }
        });

        await prisma.$transaction([
            prisma.account.delete({
            where: { accountNumber }
            }),

            prisma.user.delete({
            where: { id: account!.user.id }
            })
        ]);

    }

}