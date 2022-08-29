import Router from 'express'

import { authMiddleware } from '../middleware/authMiddleware.js'
import { fileTypeMiddleware } from '../middleware/fileTypeMiddleware.js'
import fileController from '../controllers/fileController.js'

const fileRouter = new Router()

fileRouter.post('/upload', authMiddleware, fileTypeMiddleware, fileController.uploadAvatar)
fileRouter.post('/upload/file', authMiddleware, fileController.uploadAttachment)
fileRouter.delete('/delete', authMiddleware, fileController.deleteAvatar)
fileRouter.delete('/delete/file' + '/:file', authMiddleware, fileController.deleteAttachment)

export default fileRouter