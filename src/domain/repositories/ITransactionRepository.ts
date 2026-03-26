export interface ITransactionReporitory{

    findAccount(accountNumber: string): Promise<any>

    deposit(accountNumber: string, amount: number): Promise<void>

    withdraw(accountNumber: string, amount: number): Promise<void>

    transfer(from: string, to: string, amount: number): Promise<void>
}