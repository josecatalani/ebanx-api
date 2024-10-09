import { InsufficientFundsError, InvalidDepositAmountError } from "../../expections";
import Account from "../../models/account";

test("should create an empty entity of 'Account'", () => {
    const newAccount = new Account(1);
    expect(newAccount).toBeInstanceOf(Account);
})

test("check if newly created 'Account' instance contains :id and :balance properties with default values", () => {
    const newAccount = new Account(1);
    expect(newAccount).toHaveProperty('id', 1);
    expect(newAccount).toHaveProperty('balance', 0);
});

test("check 'Account' properties types", () => {
    const newAccount = new Account(10, 100);
    expect(typeof newAccount.id).toBe('number');
    expect(typeof newAccount.balance).toBe('number');
});

test("check if newly created 'Account' receives custom values", () => {
    const newAccount = new Account(10, 100);
    expect(newAccount).toHaveProperty('id', 10);
    expect(newAccount).toHaveProperty('balance', 100);
});

test("method 'withdraw' should exists", () => {
    const newAccount = new Account(10, 100);
    expect(newAccount).toHaveProperty('withdraw');
    expect(typeof newAccount.withdraw).toBe('function');
});

test("method 'withdraw' should return the account instance", () => {
    const newAccount = new Account(10, 100);
    newAccount.withdraw(0);
    expect(newAccount).toBe(newAccount);
});

test("method 'withdraw' should compute appropriate the withdraw using positive numbers", () => {
    const newAccount = new Account(1, 100);
    newAccount.withdraw(10);
    expect(newAccount.balance).toBe(90);

    const newAccount2 = new Account(2, 100);
    newAccount2.withdraw(100);
    expect(newAccount2.balance).toBe(0);
});

test("method 'withdraw' should compute appropriate the withdraw using greater numbers than the balance", () => {
    const newAccount = new Account(1, 10);
    expect(() => newAccount.withdraw(11)).toThrow(
        InsufficientFundsError
    );

    const newAccount2 = new Account(2, 100);
    expect(() => newAccount2.withdraw(1000)).toThrow(
        InsufficientFundsError
    );

    const newAccount3 = new Account(3, 1);
    expect(() => newAccount3.withdraw(10000)).toThrow(
        InsufficientFundsError
    );

    const newAccount4 = new Account(4, 1);
    expect(newAccount4.withdraw(1)).toBe(newAccount4);
    expect(newAccount4.balance).toBe(0);
});

test("method 'deposit' should exists", () => {
    const newAccount = new Account(10, 100);
    expect(newAccount).toHaveProperty('deposit');
    expect(typeof newAccount.deposit).toBe('function');
});

test("method 'deposit' should return the account instance", () => {
    const newAccount = new Account(10, 100);
    newAccount.deposit(0);
    expect(newAccount).toBe(newAccount);
});

test("method 'deposit' should compute appropriate when depositing using positive numbers", () => {
    const newAccount = new Account(1, 10);
    newAccount.deposit(10);
    expect(newAccount.balance).toBe(20);

    const newAccount2 = new Account(2, 0);
    newAccount2.deposit(10);
    expect(newAccount2.balance).toBe(10);

    const newAccount3 = new Account(3, 0);
    newAccount3.deposit(1);
    newAccount3.deposit(10);
    newAccount3.deposit(100);
    newAccount3.deposit(1000);
    expect(newAccount3.balance).toBe(1111);
});

test("method 'deposit' shouldnt allow negative deposits", () => {
    const newAccount = new Account(1, 10);
    expect(() => newAccount.deposit(-1)).toThrow(
        InvalidDepositAmountError
    );
});