import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { AccountDTO } from "../../application/dtos/AccountDTO";
import { prisma } from "../database/prisma";
 
export class PrismaAccountRepository implements IAccountRepository {
 
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
 
    async deleteAccount(accountNumber: string): Promise<void> {
        await prisma.account.delete({
            where: { accountNumber }
        });
    }
}