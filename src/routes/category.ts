import { categoryController } from '../controllers/categoryController.js';
import { verifyUser } from '../middleware/auth.js';
import { Router } from 'express';
const router = Router();

/*** Protected routes****/

router.post('/', verifyUser, categoryController.createCategory);
router.get('/', verifyUser, categoryController.getCategories);
router.get('/:id', verifyUser, categoryController.getCategoryById);
router.put('/:id', verifyUser, categoryController.updateCategory);
router.delete('/:id', verifyUser, categoryController.deleteCategory);

export default router;
