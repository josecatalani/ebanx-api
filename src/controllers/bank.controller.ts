import { Request, Response } from "express";
import { EventType } from "../models/event";
import Bank from "../models/bank";

class BankController {
    getIndexRoute(req: Request, res: Response) {
        res.status(200).send('Hello from the EBANX API');
    }

    getBalanceRoute(req: Request, res: Response) {
        const { account_id } = req.query as unknown as { account_id: string };

        try {
            const bank = Bank.getInstance();
            const account = bank.getAccount(parseInt(account_id, 10))
            res.status(200).json(account.balance)
        }
        catch {
            res.status(404).json(0)
        }
    }

    getResetRoute(req: Request, res: Response) {
        const bank = Bank.getInstance();
        bank.reset();
        res.status(200).json('OK')
    }

    getEventPostRoute(req: Request, res: Response): Response {
        const { type, origin, amount, destination } = req.body as unknown as { type: string, origin: string, amount: number, destination: string };
    
        const bank = Bank.getInstance();
    
        const originAccountId = origin ? parseInt(origin, 10) : null;
        const destinationAccountId = destination ? parseInt(destination, 10) : null;
    
        const originAccount = originAccountId ? bank.getAccount(originAccountId) : null;
        const destinationAccount = destinationAccountId ? bank.getAccount(destinationAccountId) : null;
    
        if (type === EventType.Withdraw && !originAccount) {
            return res.status(404).json(0);
        }
    
        try {
            if (type === EventType.Deposit && destinationAccountId) {
                const updatedAccount = destinationAccount ? destinationAccount.deposit(amount) : bank.addAccount(destinationAccountId, amount);
                return res.status(201).json({ "destination": updatedAccount });
            }
    
            if (type === EventType.Withdraw && originAccount) {
                const updatedAccount = originAccount.withdraw(amount);
                return res.status(201).json({ "origin": updatedAccount });
            }
    
            if (type === EventType.Transfer && originAccount) {
                const updatedOrigin = originAccount.withdraw(amount);
                const updatedDestination = destinationAccount ? destinationAccount.deposit(amount) : bank.addAccount(destinationAccountId!, amount);
                return res.status(201).json({ "origin": updatedOrigin, "destination": updatedDestination });
            }

            return res.status(404).json(0);
    
        } catch (error) {
            return res.status(404).json(0);
        }
    }
}

export default new BankController