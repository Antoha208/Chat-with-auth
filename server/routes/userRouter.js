import Router from 'express'
import pkg from 'express-validator'

import userController from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const { check } = pkg

const userRouter = new Router()

userRouter.post('/registration', [
    check('username', 'Поле Username не может быть пустым, должен содержать два слова').matches(/[A-Za-z0-9-]+\s[A-Za-z0-9-]+/gm),
    check('password', 'Пароль должен содержать более 6-и символов и менее 12-и').isLength({min: 6, max: 12})
], userController.registration)
userRouter.post('/login', userController.login)
userRouter.post('/addLogInfo', authMiddleware, userController.addLogInfo)
userRouter.post('/addAboutInfo', [
    check('about', 'Максимум 20 символов').isLength({max: 20})
], authMiddleware, userController.addAboutInfo)
userRouter.post('/checkPassword' + '/:_id', userController.checkPassword)

userRouter.get('/users', userController.getUsers)
userRouter.get('/oneUser' + '/:_id', authMiddleware, userController.getOneUser)
userRouter.get('/auth', authMiddleware, userController.check)

userRouter.put('/updateUsername' + '/:_id', [
    check('username', 'Поле Username не может быть пустым, должен содержать два слова').matches(/[A-Za-z0-9-]+\s[A-Za-z0-9-]+/gm),
], authMiddleware, userController.updateCheckedUserUsername)
userRouter.put('/updatePassword' + '/:_id', [
    check('password', 'Пароль должен содержать более 6-и символов и менее 12-и').isLength({min: 6, max: 12}),
], authMiddleware, userController.updateCheckedUserPassword)
userRouter.put('/updateTheme' + '/:_id', authMiddleware, userController.setTheme)
userRouter.put('/updateLanguage' + '/:_id', authMiddleware, userController.setLanguage)

userRouter.delete('/removeLogInfo', authMiddleware, userController.removeLogInfo)
userRouter.delete('/deleteAll', authMiddleware, roleMiddleware(['Admin']), userController.deleteAllUsers)
userRouter.delete('/deleteOne' + '/:_id', authMiddleware, userController.deleteOneUser)

export default userRouter