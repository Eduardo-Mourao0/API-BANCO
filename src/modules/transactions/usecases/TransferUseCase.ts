import { prisma } from "../../../prisma";

interface TransferRequest{
    fromAccount: string,
    toAccount:string,
    amount: number
}

export class TransferUseCase{
    async execute({ fromAccount, toAccount, amount}: TransferRequest){

        const sender = await prisma.account.findUnique({
            where: {accountNumber: fromAccount}
        });

        const receiver = await prisma.account.findUnique({
            where: {accountNumber: toAccount},
            
        });

        if (!sender) {
            throw new Error("Conta de origem não encontrada");
        }

        if (!receiver) {
            throw new Error("Conta de destino não encontrada");
        }

        if(fromAccount === toAccount){
            throw new Error('Nao e possivel fazer transferencia para a MESMA conta! ❌');
        }

        if(amount <= 0){
            throw new Error('O valor precisa ser MAIOR que 0');
        }

        if(sender.balance.toNumber() < amount){
            throw new Error("Saldo insuficiente");
        }

        const [senderUpdated, receiverUpdated] = await prisma.$transaction([prisma.account.update({
        where: { accountNumber: fromAccount },
        data: {
          balance: {
            decrement: amount
          }
        },
        select: {
            accountNumber: true,
            user:{
                select:{
                    name:true
                }
            }
        }
        
        }), 
            
        prisma.account.update({
                where: { accountNumber: toAccount },
                data: {
                balance: {
                    increment: amount
                }
                },            
                select: {
                    accountNumber: true,
                    updatedAt: true,
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            })
        ]);

        return {
            FROM:{
                sender_Account: senderUpdated.accountNumber,
                sender_Name: senderUpdated.user.name
            },
            
            TO: {
            receiver_Account: receiverUpdated.accountNumber,
            receiver_Name: receiverUpdated.user.name
            },
            amount,
            Update: receiverUpdated.updatedAt
        }
        
    }
}