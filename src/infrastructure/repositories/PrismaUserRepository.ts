import { IUserRepository, UserDTO } from "../../domain/repositories/IUserRepository";
import { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import { prisma } from "../database/prisma";

export class PrismaUserRepository implements IUserRepository {

    async create(data: CreateUserDTO): Promise<UserDTO> {
        const { id, name, cpf, email, password, accountNumber } = data;

        const user = await prisma.user.create({
            data: {
                id,
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
            }
        });

        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
            accountNumber
        };
    }

    async findAll(): Promise<UserDTO[]> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                cpf: true,
                email: true,
                account: {
                    select: { accountNumber: true }
                }
            }
        });

        return users.map(user => ({
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            accountNumber: user.account!.accountNumber
        }));
    }

    async findByCpf(cpf: string): Promise<UserDTO | null> {
        const user = await prisma.user.findUnique({
            where: { cpf },
            include: { account: true }
        });

        if (!user) return null;

        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
            accountNumber: user.account!.accountNumber
        };
    }

    async findByCpfOrEmail(cpf: string, email: string): Promise<UserDTO | null> {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ cpf }, { email }]
            },
            include: { account: true }
        });

        if (!user) return null;

        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
            accountNumber: user.account!.accountNumber
        };
    }

    async delete(cpf: string): Promise<void> {
        await prisma.user.delete({
            where: { cpf }
        });
    }
}