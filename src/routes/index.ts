import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello from the EBANX API');
});

router.get('/balance', (req: Request, res: Response) => {
    res.status(200).send('hi')
});

export default router