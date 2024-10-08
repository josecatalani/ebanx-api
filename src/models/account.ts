export default class Account {
    id?: number;
    balance: number = 0;

    constructor(id: number | undefined, balance?: number) {
        this.id = id, 
        this.balance = balance ?? 0;
    }
}