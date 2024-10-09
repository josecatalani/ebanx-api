import { InsufficientFundsError, InvalidDepositAmountError } from "../../expections";
import Account from "../../models/account";
import Event, { EventType } from "../../models/event"

test("'EventType.Transfer' should contain all entities (Origin, Destination, Amount)", () => {
    const account1 = new Account(1, 10);
    const account2 = new Account(2, 10);
    const newTransaction = new Event(EventType.Transfer, 10, account1, account2);

    expect(newTransaction).toHaveProperty('origin', account1);
    expect(newTransaction).toHaveProperty('destination', account2);
    expect(newTransaction).toHaveProperty('amount', 10);
});

test("'EventType.Deposit' should contain only (Destination, Amount)", () => {
    const account1 = new Account(1, 10);
    const newTransaction = new Event(EventType.Deposit, 10, account1);

    expect(newTransaction).toHaveProperty('destination', account1);
    expect(newTransaction).toHaveProperty('amount', 10);
});

test("'EventType.Withdraw' should contain only (Origin, Amount)", () => {
    const account1 = new Account(1, 10);
    const newTransaction = new Event(EventType.Withdraw, 10, account1);

    expect(newTransaction).toHaveProperty('origin', account1);
    expect(newTransaction).toHaveProperty('amount', 10);
});

test("'EventType.Withdraw' should compute the operation", () => {
    const account1 = new Account(1, 10);
    expect(account1).toHaveProperty('balance', 10);
    new Event(EventType.Withdraw, 10, account1);
    expect(account1).toHaveProperty('balance', 0);
});

test("'EventType.Deposit' should compute the operation", () => {
    const account1 = new Account(1, 0);
    expect(account1).toHaveProperty('balance', 0);
    new Event(EventType.Deposit, 10, account1);
    expect(account1).toHaveProperty('balance', 10);
});

test("'EventType.Deposit' shouldnt compute the operation due to invalid deposit amount", () => {
    const account1 = new Account(1, 0);
    expect(account1).toHaveProperty('balance', 0);
    expect(() => new Event(EventType.Deposit, -1, account1)).toThrow(
        InvalidDepositAmountError
    );
});

test("'EventType.Transfer' should compute the operation", () => {
    const account1 = new Account(1, 10);
    const account2 = new Account(2, 0);
    expect(account1).toHaveProperty('balance', 10);
    expect(account2).toHaveProperty('balance', 0);
    new Event(EventType.Transfer, 10, account1, account2);
    expect(account1).toHaveProperty('balance', 0);
    expect(account2).toHaveProperty('balance', 10);
});

test("'EventType.Transfer' shouldnt compute the operation due to invalid funds", () => {
    const account1 = new Account(1, 10);
    const account2 = new Account(2, 0);
    expect(account1).toHaveProperty('balance', 10);
    expect(account2).toHaveProperty('balance', 0);

    expect(() => new Event(EventType.Transfer, 20, account1, account2)).toThrow(
        InsufficientFundsError
    );
});