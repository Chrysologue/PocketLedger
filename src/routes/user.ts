import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { verifyUser } from '../middleware/auth.js';
import { verifyRole } from '../middleware/role.js';
import {
  validateCreateUser,
  validateUpdateUser,
  validateLoginRules,
} from '../validator/userValidator.js';

const router = Router();

//Public routes
router.post('/register', validateCreateUser, userController.createUser);
router.post('/login', validateLoginRules, userController.login);

//Protected routes
router.get('/', verifyUser, verifyRole('admin'), userController.getAllUsers);
router.get('/user', verifyUser, userController.getProfile);
router.put('/', verifyUser, validateUpdateUser, userController.updateProfile);
router.delete('/', verifyUser, userController.deleteAccount);

export default router;
