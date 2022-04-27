import bcryptjs from 'bcrypt'

import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import {secret} from '../config.js'
import Role from '../models/Role.js'
import User from '../models/User.js'

const generateToken = (id, username, roles, avatar, registrationDate) => {
    const payload = {
        id,
        username,
        roles,
        avatar,
        registrationDate,
    }
    return jwt.sign(payload, secret, {expiresIn: '6h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка! Убедитесь в том, что поле Username не пустое, содержит два слова, пароль содержит от 6и до 12и символов.', errors})
            }
            const {username, password} = req.body
            const condidate = await User.findOne({username})
            if (condidate) {
                return res.status(400).json({message: 'Данный пользователь уже зарегистрирован'})
            }
            const hashedPassword = bcryptjs.hashSync(password, 5)
            const userRole = await Role.findOne({value: 'Admin'})
            const avatar = ''
            const registrationDate = Date.now()
            const user = new User({username, password: hashedPassword, roles: [userRole.value], avatar: avatar, registrationDate: registrationDate})
            await user.save()
            const token = generateToken(user._id, user.username, user.roles, user.avatar, user.registrationDate)
            return res.json({token, user})
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
            const token = generateToken(user._id, user.username, user.roles, user.avatar)
            return res.json({token, user}) 
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllUsers(req, res) {
        try {
            await User.deleteMany({})
            res.json('Users were deleted')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOneUser(req, res) {
        try {
            const {_id} = req.params
            const user = await User.findOne({_id})
            await User.deleteOne({user})
            res.json(`user ${user.username} was deleted`)
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser (req, res) {
        try {
            const {_id} = req.params
            const user = req.body
            const updatedUser = await User.findByIdAndUpdate(_id, user, {new: true})
            return res.json(updatedUser)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async check(req, res) {
        const token = generateToken(req.user._id, req.user.username, req.user.roles)
        return res.json({token})
    }
}

export default new authController()