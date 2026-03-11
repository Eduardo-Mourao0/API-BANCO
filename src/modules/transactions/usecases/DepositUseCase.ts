import { prisma } from "../../../prisma";

interface depositRequest{
    accountNumber: string,
    amount: number;
}

export class DepositUseCase{
    async execute({ accountNumber, amount}: depositRequest){

        if(amount <= 0){
            throw new Error("Valor tem que ser MAIOR que 0.")
        }

        const accountExiste = await prisma.account.findUnique({
            where:{ accountNumber }
        })

        if(!accountExiste){
            throw new Error("Conta NAO encontrada.")
        }

        const updatedAccount = await prisma.account.update({
            where: {accountNumber},
            data: {
                balance: {
                    increment: amount
                }
            },
            select: {
                id: true,
                accountNumber: true,
                balance: true,
                updatedAt: true
            }
        })

        return updatedAccount;
    }
}