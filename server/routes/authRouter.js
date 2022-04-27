import Router from 'express'
import pkg from 'express-validator'

import authController from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const { check } = pkg

const authRouter = new Router()

authRouter.post('/registration', [
    check('username', 'Поле Username не может быть пустым, должен содержать два слова').matches(/[A-Za-z0-9-]+\s[A-Za-z0-9-]+/gm),
    check('password', 'Пароль должен содержать более 6-и символов и менее 12-и').isLength({min: 6, max: 12})
], authController.registration)
authRouter.post('/login', authController.login)
authRouter.get('/users', roleMiddleware(['Admin']), authController.getUsers)
authRouter.get('/auth', authMiddleware, authController.check)
authRouter.put('/update' + '/:_id', authMiddleware, authController.updateUser)
authRouter.delete('/deleteAll', authMiddleware, roleMiddleware(['Admin']), authController.deleteAllUsers)
authRouter.delete('/deleteOne' + '/:_id', authMiddleware, roleMiddleware(['Admin']), authController.deleteOneUser)

export default authRouter