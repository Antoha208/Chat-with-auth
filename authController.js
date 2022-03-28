import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import {secret} from './config.js'
import Role from './models/Role.js'
import User from './models/User.js'

const generateToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '6h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка', errors})
            }
            const {username, password} = req.body
            const condidate = await User.findOne({username})
            if (condidate) {
                return res.status(400).json({message: 'Данный пользователь уже зарегистрирован'})
            }
            const hashedPassword = bcryptjs.hashSync(password, 5)
            const userRole = await Role.findOne({value: 'User'})
            const user = new User({username, password: hashedPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован!'})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Registration failed'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь с логином ${username} не зарегистрирован`})
            }
            const passwordCheck = bcryptjs.compareSync(password, user.password)
            if (!passwordCheck) {
                return res.status(400).json({message: 'Пароль введен неверно!'})
            }
            const token = generateToken(user._id, user.roles)
            return res.json({token}) 
        } catch (error) {
            
        }
    }

    async getUsers(req, res) {
        try {
            res.json('server is working')
        } catch (error) {
            console.log(error)
        }
    }
}

export default new authController()