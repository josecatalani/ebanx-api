import Account from "./account";

class Bank {
    accounts: Record<number, Account> = {};

    addAccount(accountId: number, accountBalance?: number): Account {
        if (this.accounts[accountId]) {
            throw Error(`An account with :id{${accountId}} already exists.`);
        }

        const newAccount = new Account(accountId, accountBalance);

        this.accounts[accountId] = newAccount;

        return this.accounts[accountId];
    }
    getAccount(accountId: number): Account {
        if (
            typeof accountId !== "number" ||
            accountId < 0 ||
            !Number.isInteger(accountId) ||
            Number.isNaN(accountId)
        ) {
            throw ("Provide a valid accountId");
        }

        return this.accounts[accountId] ?? null;
    }
    reset() {
        this.accounts = {};
    }
    isAccountsEmpty(): boolean {
        return this.countOfAccounts() === 0;
    }
    countOfAccounts(): number {
        return Object.keys(this.accounts).length;
    }
};

const bank = new Bank();

export default bank;