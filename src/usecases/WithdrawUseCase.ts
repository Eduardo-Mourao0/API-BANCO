import { prisma } from "../prisma";

interface WithdrawRequest{
    accountNumber: string,
    amount: number;
}

export class WithdrawUseCase{
    async execute({ accountNumber, amount}: WithdrawRequest){

        const account = await prisma.account.findFirst({
            where: {accountNumber}
        })

        if(!account){
            throw new Error("Conta nao encontrada!")
        }
        
        if(amount <= 0){
            throw new Error('Valor precisa ser MAIOR que 0!');
        }
        
        if(account.balance.toNumber() < amount){
            throw new Error('Saldo insuficiente!')
        }

        const accountUpdated = await prisma.account.update({
            where: { id: account.id},
            data: {
                balance: account.balance.toNumber() - amount
            },
            select: {
                id: false,
                accountNumber: true,
                balance: true,
                updatedAt: true
            }
        });

        return accountUpdated;
    }
}