import { IUserRepository} from "../../domain/repositories/IUserRepository";
import { prisma } from "../database/prisma";
import { User } from "../../domain/entities/User";
import {v4 as uuidv4} from "uuid";

export class PrismaUserRepository implements IUserRepository {

    async create(user: User): Promise<void> {
    await prisma.user.create({
        data: {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
            account: {
                create: {
                    id: uuidv4(),
                    accountNumber: user.accountNumber
                }
            }
        }
        });
    }

    async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({
        include: { account: true }
    });

    return users.map(user =>
        User.createFromPrimitives({
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
            accountNumber: user.account!.accountNumber
        })
    );
}

    async findByCpf(cpf: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { cpf },
            include: { account: true }
        });

        if (!user) return null;

        return User.createFromPrimitives({
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        accountNumber: user.account!.accountNumber
    });
    }

    async findByCpfOrEmail(cpf: string, email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ cpf }, { email }]
            },
            include: { account: true }
        });

        if (!user) return null;

        return User.createFromPrimitives({
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
            accountNumber: user.account!.accountNumber
        });
    }

     async delete(cpf: string): Promise<void> {
        await prisma.user.delete({
            where: { cpf }
        });
    }
}
