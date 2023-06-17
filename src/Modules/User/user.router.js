import {Router} from 'express'
import * as UserConroller from './controller/user.controller.js'
import { auth } from '../../Middleware/auth.middleware.js';
import { asyncHandler } from '../../services/errorHandling.js';
import fileUpload, { HME } from '../../services/multer.js';
const router = Router()


router.get('/profile', auth, asyncHandler(UserConroller.profile))
router.patch('/profilePic', auth, fileUpload().single('image'), HME, UserConroller.profilePic)

export default router;