import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { AccountDTO } from "../../application/dtos/AccountDTO";
import { prisma } from "../database/prisma";
 
export class PrismaTransactionRepository implements ITransactionRepository{
 
    async findAccount(accountNumber: string): Promise<AccountDTO | null> {
        const account = await prisma.account.findUnique({
            where: { accountNumber }
        });
 
        if (!account) return null;
 
        return {
            accountNumber: account.accountNumber,
            balance: account.balance.toNumber()
        };
    }
 
    async updateBalance(accountNumber: string, balance: number): Promise<void> {
        await prisma.account.update({
            where: { accountNumber },
            data: { balance }
        });
    }
 
    async transfer(fromAccount: string, toAccount: string, fromBalance: number, toBalance: number): Promise<void> {
        await prisma.$transaction([
            prisma.account.update({
                where: { accountNumber: fromAccount },
                data: { balance: fromBalance }
            }),
            prisma.account.update({
                where: { accountNumber: toAccount },
                data: { balance: toBalance }
            })
        ]);
    }
}