import Router from 'express'
import pkg from 'express-validator'

import authController from './authController.js'
//import { authMiddleware } from './middleware/authMiddleware.js'
import { roleMiddleware } from './middleware/roleMiddleware.js'

const { check } = pkg

const router = new Router()

router.post('/registration', [
    check('username', 'Это поле не может быть пустым').notEmpty(),
    check('password', 'Пароль должен содержать более 6-и символов и менее 12-и').isLength({min: 6, max: 12})
], authController.registration)
router.post('/login', authController.login)
router.get('/users', roleMiddleware(['Admin']), authController.getUsers)

export default router