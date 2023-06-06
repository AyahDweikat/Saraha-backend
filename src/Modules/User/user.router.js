import {Router} from 'express'
import * as UserConroller from './controller/user.controller.js'
import { auth } from '../../Middleware/auth.middleware.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router()

router.get('/profile', auth, asyncHandler(UserConroller.profile))

export default router;