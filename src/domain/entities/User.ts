import { BusinessError } from "../exceptions/BusinessError";
import * as bcrypt from "bcrypt";

export class User{
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly cpf: string,
        public readonly email: string,
        private _password: string,
        public readonly accountNumber: string
    ){
        this.validate();
    }

    get password(): string {
        return this._password
    }

    private validate(){
        
        if(!this.name){
            throw new BusinessError("Nome e obrigatorio.");
        }

        if (!this.isValidCpf(this.cpf)) {
            throw new BusinessError("CPF inválido.");
        }

        if(!this._password){
            throw new BusinessError("Senha e obrigatorio")
        }

        if (!this.isValidEmail(this.email)) {
            throw new BusinessError("Email inválido.");
        }

        if (!this.accountNumber) {
            throw new BusinessError("Número de conta é obrigatório.");
        }
    }

    private isValidCpf(cpf: string): boolean{
        const cleaned = cpf.replace(/\D/g, "");
        return cleaned.length === 11;
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async hashPassword(): Promise<void> {
        this._password = await bcrypt.hash(this._password, 10);
    }

    canDelete(balance: number): void {
        if (balance > 0) {
            throw new BusinessError("Não é possível excluir uma conta com saldo.");
        }
    }

    static create(id: string, name: string, cpf: string, email: string, password: string, accountNumber: string): User {
        const user = new User(id, name, cpf, email, password, accountNumber);
        return user;
    }

    static createFromPrimitives(data: { id: string; name: string; cpf: string; email: string; password: string; accountNumber: string }): User {
        const { id, name, cpf, email, password, accountNumber } = data;
        return new User(id, name, cpf, email, password, accountNumber);
    }
}