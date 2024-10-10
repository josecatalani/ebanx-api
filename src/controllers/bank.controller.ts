import { Request, Response } from "express";

class BankController {
    getIndexRoute(req: Request, res: Response) {
        res.status(200).send('Hello from the EBANX API');
    }

    getBalanceRoute(req: Request, res: Response) {
        res.status(200).send('hi')
    }
}

export default new BankController