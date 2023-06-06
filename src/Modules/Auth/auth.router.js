import {Router} from 'express';
const router = Router()
import * as AuthController from './controller/auth.controller.js'
import { asyncHandler } from '../../services/errorHandling.js';
import { validationFun } from '../../Middleware/validation.js';
import * as validators from './auth.validation.js';


router.post('/signUp',validationFun(validators.signupSchema), asyncHandler(AuthController.signUp))
router.post('/signIn',validationFun(validators.loginSchema), asyncHandler(AuthController.signIn))

export default router;