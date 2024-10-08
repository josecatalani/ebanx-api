import bank from "../../models/bank"

beforeEach(() => {
    bank.accounts = {};
});


test("'Bank' model should contain an empty dict of accounts", () => {
    expect(bank).toHaveProperty("accounts", {})
})

test("'Bank:addAccount' should throw an error when adding an account with existing ID", () => {
    const accountId = 100;
    bank.addAccount(accountId, 50);
    expect(() => bank.addAccount(accountId)).toThrow(
        `An account with :id{${accountId}} already exists.`
    );
});

test("'Bank:addAccount' should create an account with zero balance if not provided", () => {
    const accountId = 200;
    const newAccount = bank.addAccount(accountId);
    expect(newAccount.id).toBe(accountId);
    expect(newAccount.balance).toBe(0);
});

test("'Bank:addAccount' should return the created account item", () => {
    const accountId = 10;
    const accountBalance = 100;
    const newAccount = bank.addAccount(accountId, accountBalance);
    expect(newAccount.id).toBe(accountId);
    expect(newAccount.balance).toBe(accountBalance);
});

test("'Bank:getAccount' should throw an error when receives an invalid :accountId", () => {
    expect(() => bank.getAccount(-1)).toThrow(
        "Provide a valid accountId"
    );
    expect(() => bank.getAccount(0.5)).toThrow(
        "Provide a valid accountId"
    );
    expect(() => bank.getAccount(NaN)).toThrow(
        "Provide a valid accountId"
    );
});

test("'Bank:getAccount' should return null when there's no account with id", () => {
    const account = bank.getAccount(10);
    expect(account).toBe(null);
});

test("'Bank:getAccount' should return the correct account by id", () => {
    bank.addAccount(1, 1);
    bank.addAccount(2, 2);
    bank.addAccount(3, 3);
    const thirdAccount = bank.getAccount(3);
    expect(thirdAccount.id).toBe(3)
    expect(thirdAccount.balance).toBe(3)
});

test("'Bank:isAccountEmpty' should return false as default", () => {
    expect(bank.isAccountsEmpty()).toBe(true);
});

test("'Bank:countOfAccounts' should return N when there's only N account", () => {
    bank.addAccount(1, 1);
    bank.addAccount(2, 2);
    expect(bank.countOfAccounts()).toBe(2);
});

test("'Bank:reset' should reset the accounts", () => {
    bank.addAccount(1, 1);
    bank.addAccount(2, 2);
    bank.addAccount(3, 3);
    expect(bank.isAccountsEmpty()).toBe(false);
    bank.reset();
    expect(bank.isAccountsEmpty()).toBe(true);
});