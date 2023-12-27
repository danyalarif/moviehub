import express from "express";
import { getAuthorizedUser, login, register } from "../controllers/userController.js";
import { loginValidation, registerValidation } from "../utilities/validators/userValidator.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router()

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.get('/me', checkToken, getAuthorizedUser)

export default router