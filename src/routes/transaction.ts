import { Router } from 'express';
import { transactionController } from '../controllers/transactionController.js';
import { verifyUser } from '../middleware/auth.js';
import {
  validateCreateTransactionRules,
  validateUpdateTransactionRules,
  validateGetTransactionRules,
  validateGetTransactionByIdRules,
  validateDeleteTransactionRules,
} from '../validator/transactionValidator.js';
const router = Router();

/**Protected routes */
router.post(
  '/',
  verifyUser,
  validateCreateTransactionRules,
  transactionController.createTransaction
);
router.get(
  '/',
  verifyUser,
  validateGetTransactionRules,
  transactionController.getTransactions
);
router.get(
  '/:id',
  verifyUser,
  validateGetTransactionByIdRules,
  transactionController.getTransactionById
);
router.put(
  '/:id',
  verifyUser,
  validateUpdateTransactionRules,
  transactionController.updateTransaction
);
router.delete(
  '/:id',
  verifyUser,
  validateDeleteTransactionRules,
  transactionController.deleteTransaction
);

export default router;
