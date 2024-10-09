import { InsufficientFundsError, InvalidDepositAmountError } from "../expections";

export default class Account {
    id?: number;
    balance: number = 0;

    constructor(id: number | undefined, balance?: number) {
        this.id = id, 
        this.balance = balance ?? 0;
    }

    withdraw(amount: number) {
        if (amount > this.balance) {
          throw new InsufficientFundsError("Insufficient funds for this transaction.");
        }

        this.balance -= amount;

        return this;
    }

    deposit(amount: number) {
        if (amount < 0) {
          throw new InvalidDepositAmountError("Invalid deposit amount.");
        }

        this.balance += amount;

        return this;
    }
}