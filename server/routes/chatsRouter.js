import Router from 'express'

import chatsController from '../controllers/chatsController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


const chatsRouter = new Router()

chatsRouter.post('/create' + '/:_id', authMiddleware, chatsController.createNewChat)

chatsRouter.get('/getChats' + '/:_id', authMiddleware, chatsController.getAllChats)

chatsRouter.delete('/deleteAll' + '/:_id', authMiddleware, chatsController.deleteAllChats)
chatsRouter.delete('/deleteOne' + '/:_id' + '/:objectId', authMiddleware, chatsController.deleteOneChat)

export default chatsRouter