import { Router, Request, Response } from 'express';
import BankController from '../controllers/bank.controller';

const router = Router();

router.get('/', BankController.getIndexRoute);
router.get('/balance', BankController.getBalanceRoute);

export default router