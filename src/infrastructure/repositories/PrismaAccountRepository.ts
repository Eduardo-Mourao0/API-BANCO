import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { prisma } from "../database/prisma";
import { Account } from "../../domain/entities/Account";

export class PrismaAccountRepository implements IAccountRepository {

    async findAccount(accountNumber: string): Promise<Account | null> {
        const account = await prisma.account.findUnique({
            where: { accountNumber }
        });

        if (!account) return null;

        return Account.createFromPrimitives({
            accountNumber: account.accountNumber,
            balance: account.balance.toNumber()
        });
    }

    async updateBalance(accountNumber: string, balance: number): Promise<void> {
        await prisma.account.update({
            where: { accountNumber },
            data: { balance }
        });
    }

    async deleteAccount(accountNumber: string): Promise<void> {
        await prisma.account.delete({
            where: { accountNumber }
        });
    }
}