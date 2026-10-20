import { Router } from 'express';
import { transactionController } from '../controllers/transactionController.js';
import { verifyUser } from '../middleware/auth.js';
const router = Router();

/**Protected routes */
router.post('/', verifyUser, transactionController.createTransaction);
router.get('/', verifyUser, transactionController.getTransactions);
router.get('/:id', verifyUser, transactionController.getTransactionById);
router.put('/:id', verifyUser, transactionController.updateTransaction);
router.delete('/:id', verifyUser, transactionController.deleteTransaction);

export default router;
