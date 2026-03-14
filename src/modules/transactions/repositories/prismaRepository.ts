import { ITransactionReporitory } from "./ITransactionRepository";
import { prisma } from "../../../prisma";

export class prismaTransactionRepository implements ITransactionReporitory{

    async findAccount(accountNumber: string): Promise<any> {
        
        return prisma.account.findUnique({
            where: {accountNumber}
        })
    }

    async deposit(accountNumber: string, amount: number): Promise<void> {
        
        await prisma.account.update({
            where: {accountNumber},
            data: {
                balance:{
                    increment: amount
                }                
            },
            select: {
                id:true,
                accountNumber: true,
                balance: true,
                updatedAt: true
            }
        })
    }

    async withdraw(accountNumber: string, amount: number): Promise<void> {
        
        await prisma.account.update({
            where: {accountNumber},
            data: {
                balance: {
                    decrement: amount
                }
            },
            select: {
                id: false,
                accountNumber: true,
                balance: true,
                updatedAt: true
            }
        })
    }

    async transfer(fromAccount: string, toAccount: string, amount: number): Promise<void> {
        
        await prisma.$transaction([
            prisma.account.update({
                where: {accountNumber: fromAccount},
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            }),

            prisma.account.update({
                where: {accountNumber: toAccount},
                data: {
                    balance: {
                        increment: amount
                    }
                }
            })
        ]);
    }
}