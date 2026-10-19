import {Router} from 'express'
import { userController } from '../controllers/userController.js'
import { verifyUser } from '../middleware/auth.js'
import { verifyRole } from '../middleware/role.js'

const router = Router()

//Public routes
router.post("/register", userController.createUser)
router.post("/login", userController.login)

//Protected routes
router.get("/",verifyUser, verifyRole("admin"), userController.getAllUsers)
router.get("/user", verifyUser, userController.getProfile)
router.put("/", verifyUser, userController.updateProfile)
router.delete("/", verifyUser, userController.deleteAccount)

export default router