import { ITransactionManager } from "../../domain/managers/ITransactionManager";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { Account } from "../../domain/entities/Account";
import { prisma } from "../database/prisma";

export class PrismaTransactionManager implements ITransactionManager {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly transactionRepository: ITransactionRepository
    ) {}

    async deposit(account: Account, amount: number) {
        return prisma.$transaction(async () => {
            await this.accountRepository.updateBalance(account.accountNumber, account.balance);
            await this.transactionRepository.save(account.accountNumber, "DEPOSIT", amount);

            return { 
                accountNumber: account.accountNumber, 
                amount, 
                balance: account.balance, 
                date: new Date() 
            };
        });
    }

    async withdraw(account: Account, amount: number) {
        return prisma.$transaction(async () => {

            await this.accountRepository.updateBalance(account.accountNumber, account.balance);
            await this.transactionRepository.save(account.accountNumber, "WITHDRAW", amount);

            return { 
                accountNumber: account.accountNumber, 
                amount, 
                balance: account.balance, 
                date: new Date() };
        });
    }

    async transfer(fromAccount: Account, toAccount: Account, amount: number) {
        return prisma.$transaction(async () => {

            await Promise.all([
                this.accountRepository.updateBalance(fromAccount.accountNumber, fromAccount.balance),
                this.accountRepository.updateBalance(toAccount.accountNumber, toAccount.balance),
                this.transactionRepository.save(fromAccount.accountNumber, "TRANSFER", amount),
                this.transactionRepository.save(toAccount.accountNumber, "DEPOSIT", amount),
            ]);

            return { 
                fromAccount: fromAccount.accountNumber, 
                toAccount: toAccount.accountNumber, 
                amount, 
                date: new Date() 
            };
        });
    }
}