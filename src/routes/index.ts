import { Router, Request, Response } from 'express';
import BankController from '../controllers/bank.controller';

const router = Router();

router.post('/reset', BankController.getResetRoute);
router.get('/', BankController.getIndexRoute);
router.get('/balance', BankController.getBalanceRoute);
router.post('/event', BankController.getEventPostRoute);

export default router