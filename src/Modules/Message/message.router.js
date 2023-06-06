import {Router} from 'express';
const router = Router()
import * as MessageController from './controller/message.controller.js'
router.get('/', MessageController.getMessages)

export default router;