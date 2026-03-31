import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { AccountDTO } from "../../application/dtos/AccountDTO";
import { Transaction, TransactionType } from "../../domain/entities/Transaction";
import { prisma } from "../database/prisma";

export class PrismaTransactionRepository implements ITransactionRepository {

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

    async findTransactionsByAccount(accountNumber: string): Promise<Transaction[]> {
        
        const account = await prisma.account.findUnique({
            where: { accountNumber },
            select: { id: true }
        });

        if (!account) return [];

        const transactions = await prisma.transaction.findMany({
            where: { accountId: account.id },
            orderBy: { createdAt: "desc" }
        });

        return transactions.map(t => new Transaction({
            id: t.id,
            accountId: t.accountId,
            type: t.type as Transaction["type"],
            amount: t.amount.toNumber(),
            createdAt: t.createdAt
        }));
    }

    async saveTransaction(accountNumber: string, type: TransactionType, amount: number): Promise<void> {
    const account = await prisma.account.findUnique({
        where: { accountNumber },
        select: { id: true }
    });

    if (!account) return;

    await prisma.transaction.create({
        data: {
            accountId: account.id,
            type,
            amount
        }
    });
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