import { prisma } from "../../../prisma";

interface CreateUser{
    name: string;
    cpf: string;
    email: string;
    password: string;
}

export class CreateUserUseCase{
    async execute({name, cpf, email, password}: CreateUser){

        const generatedAccountNumber = Math.floor(10000 + Math.random() * 90000).toString();

        const userJaExiste = await prisma.user.findFirst({
            where: {
                OR: [
                    { cpf },
                    { email }
                ]
            }
        });

        if (userJaExiste){
            throw new Error('CPF ou Email já cadastrado!');
        }
        
        const user = await prisma.user.create({
            data: {
                name,
                cpf,
                email,
                password,
                account: {
                    create: {
                        accountNumber: generatedAccountNumber,
                        balance: 0.00
                    }
                }
            },
            include: {
                account: true
            }
            });

        return user;
    }
}