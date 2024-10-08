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