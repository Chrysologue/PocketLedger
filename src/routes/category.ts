import { categoryController } from '../controllers/categoryController.js';
import { verifyUser } from '../middleware/auth.js';
import {
  validateCreateCategoryRules,
  validateUpdateCategoryRules,
  validateGetCategoryByIdRules,
  validateGetCategoryRules,
  validateDeleteCategotyRules,
} from '../validator/categoryValidator.js';
import { Router } from 'express';
const router = Router();

/*** Protected routes****/

router.post(
  '/',
  verifyUser,
  validateCreateCategoryRules,
  categoryController.createCategory
);
router.get(
  '/',
  verifyUser,
  validateGetCategoryRules,
  categoryController.getCategories
);
router.get(
  '/:id',
  verifyUser,
  validateGetCategoryByIdRules,
  categoryController.getCategoryById
);
router.put(
  '/:id',
  verifyUser,
  validateUpdateCategoryRules,
  categoryController.updateCategory
);
router.delete(
  '/:id',
  verifyUser,
  validateDeleteCategotyRules,
  categoryController.deleteCategory
);

export default router;
