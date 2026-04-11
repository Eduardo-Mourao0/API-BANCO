import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { Transaction, TransactionType } from "../../domain/entities/Transaction";
import { prisma } from "../database/prisma";

export class PrismaTransactionRepository implements ITransactionRepository {

    async save(accountNumber: string, type: TransactionType, amount: number): Promise<void> {
        const account = await prisma.account.findUnique({
            where: { accountNumber },
            select: { id: true }
        });

        if (!account) return;

        await prisma.transaction.create({
            data: { accountId: account.id, type, amount }
        });
    }

    async findByAccount(accountNumber: string): Promise<Transaction[]> {
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
            type: t.type as TransactionType,
            amount: t.amount.toNumber(),
            createdAt: t.createdAt
        }));
    }
}