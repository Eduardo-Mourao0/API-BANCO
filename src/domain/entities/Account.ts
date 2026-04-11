import { BusinessError } from "../exceptions/BusinessError";

export class Account{
    private constructor(
        public readonly accountNumber: string, 
        private _balance: number) {
    }
    
    get balance(): number{
        return this._balance;
    }
    
    static create(accountNumber: string, balance: number): Account {

        if(!accountNumber) throw new BusinessError("Numero da conta é obrigatorio");

        if(balance < 0) throw new BusinessError("Saldo inicial não pode ser negativo");

        return new Account(accountNumber, balance);
    }
    
    static createFromPrimitives(data: { accountNumber: string; balance: number }): Account {
        const { accountNumber, balance } = data;
        return new Account(accountNumber, balance);
    }
    
    deposit(amount: number) {
        
        if(amount <= 0){
            throw new BusinessError("Valor tem que ser MAIOR que 0");
        }

        this._balance += amount;
    }
    
    withdraw(amount: number) {
    
        if (amount <= 0) {
            throw new BusinessError("Valor precisa ser MAIOR que 0!");
        }

        if (amount > this._balance) {
            throw new BusinessError("Saldo insuficiente!");
        }

        this._balance -= amount;
    }
    
    transfer(amount: number, target: Account) {
        
        if (amount <= 0) {
            throw new BusinessError("Valor precisa ser MAIOR que 0.");
        }

        if (amount > this._balance) {
            throw new BusinessError("Saldo insuficiente!");
        }

        this._balance -= amount;
        target._balance += amount;
    }
}