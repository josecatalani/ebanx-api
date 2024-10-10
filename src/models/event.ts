import { InvalidDepositAmountError } from "../expections";
import Account from "./account";

export enum EventType {
    Deposit = "deposit",
    Withdraw = "withdraw",
    Transfer = "transfer"
};

export default class Event {
    type: EventType;
    origin?: Account;
    destination?: Account;
    amount: number;
  
    constructor(type: EventType.Deposit, amount: number, receiver: Account);
    constructor(type: EventType.Withdraw, amount: number, sender: Account);
    constructor(type: EventType.Transfer, amount: number, sender: Account, receiver: Account);
    constructor(type: EventType, amount: number, account: Account, destination?: Account) {
      this.type = type;
      this.amount = amount;
  
      if (amount < 0) {
        throw new InvalidDepositAmountError("The transaction amount must be greater or equal than zero.");
      }
  
      if (type === EventType.Deposit) {
        this.destination = account;

        account.deposit(amount);
      } else if (type === EventType.Withdraw) {
        this.origin = account;

        account.withdraw(amount);
      } else if (type === EventType.Transfer) {
        this.origin = account;
        this.destination = destination;

        account.withdraw(amount);
        destination?.deposit(amount)
      }
    }
}