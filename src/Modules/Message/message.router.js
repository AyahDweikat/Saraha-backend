import {Router} from 'express';
const router = Router()
import * as MessageController from './controller/message.controller.js'
import { auth } from '../../Middleware/auth.middleware.js';
router.get('/getMessages',auth, MessageController.getMessages)
router.delete('/deleteMessage',auth, MessageController.deleteMessage)

router.post('/sendMessage/:receiverId', MessageController.sendMessage)


export default router;