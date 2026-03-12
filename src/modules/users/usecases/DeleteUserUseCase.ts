import { prisma } from "../../../prisma";

interface DeleteRequest{
    accountNumber: string
}

export class DeleteUserUseCase{
    async execute({accountNumber}: DeleteRequest){

       const account = await prisma.account.findUnique({ 
            where: { accountNumber },
            include: {
                user: true
            }
        });

        if(!account){
            throw new Error('Conta não encontrada')
        }
        
        if(account.balance.toNumber() > 0){
            throw new Error("Sua conta bancaria precisa estar com o balance ZERADO!")
        }

        await prisma.$transaction([
            prisma.account.delete({
                where: {accountNumber}
            }),

            prisma.user.delete({
                where: { id: account.user.id }
            })
        ]);

        return {
            message: 'Usuario e Conta DELETADOS com SUCESSO! ✅'
        };
    }
}