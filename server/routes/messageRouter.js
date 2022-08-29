import Router from 'express'

import messageController from '../controllers/messageController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


const messageRouter = new Router()

messageRouter.post('/add' + '/:_id', authMiddleware, messageController.addMessage)

messageRouter.get('/getMessages' + '/:_id', authMiddleware, messageController.getAllMessages)

// messageRouter.put('/updateOne' + '/:_id' + '/:objectId', authMiddleware, messageController.updateOneMessage)

messageRouter.delete('/deleteAllFromChat' + '/:_id', authMiddleware, messageController.deleteAllMessagesFromChat)
// messageRouter.delete('/deleteAll' + '/:_id', authMiddleware, messageController.deleteAllMessages)
// messageRouter.delete('/deleteOne' + '/:_id' + '/:objectId', authMiddleware, messageController.deleteOneMessage)

export default messageRouter