export type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";

export class Transaction {
    public readonly id: string;
    public readonly accountId: string;
    public readonly type: TransactionType;
    public readonly amount: number;
    public readonly createdAt: Date;

    constructor(props: {
        id: string;
        accountId: string;
        type: TransactionType;
        amount: number;
        createdAt?: Date;
    }) {
        this.id = props.id;
        this.accountId = props.accountId;
        this.type = props.type;
        this.amount = props.amount;
        this.createdAt = props.createdAt ?? new Date();

        this.validate();
    }

    private validate() {
        if (this.amount <= 0) {
            throw new Error("Valor da transação deve ser maior que zero");
        }
    }
}