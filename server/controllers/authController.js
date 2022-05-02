import bcryptjs from 'bcrypt'

import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import {secret} from '../config.js'
import Role from '../models/Role.js'
import User from '../models/User.js'

const generateToken = (id, username, roles, avatar, about, registrationDate) => {
    const payload = {
        id,
        username,
        roles,
        avatar,
        about,
        registrationDate
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
            const about = ''
            const registrationDate = Date.now()
            const user = new User({username, password: hashedPassword, roles: [userRole.value], avatar: avatar, about: about, registrationDate: registrationDate, })
            await user.save()
            const token = generateToken(user._id, user.username, user.roles, user.avatar, user.about, user.registrationDate)
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
            const token = generateToken(user._id, user.username, user.roles, user.avatar, user.about)
            return res.json({token, user}) 
        } catch (error) {
            console.log(error)
        }
    }

    async addLogInfo(req, res) {
        try {
            const {iat, exp} = req.body
            const user = await User.findById(req.user.id)
            user.iat = iat
            user.exp = exp
            await user.save()
            res.json({message: 'Information added', user})
        } catch (error) {
            res.status(400).json({message: 'Information adding error'})
        }
    }

    async removeLogInfo(req, res) {
        try {
            const user = await User.findById(req.user.id)
            user.iat = 0
            user.exp = 0
            await user.save()
            res.json({message: 'Information removed', user})
        } catch (error) {
            res.status(400).json({message: 'Information removing error'})
        }
    }

    async addAboutInfo(req, res) {
        try {
            const {about} = req.body
            const user = await User.findById(req.user.id)
            user.about = about
            await user.save()
            res.json({message: 'Information added', user})
        } catch (error) {
            res.status(400).json({message: 'Information adding error'})
        }
    }

    // async removeAboutInfo(req, res) {
    //     try {
    //         const user = await User.findById(req.user.id)
    //         user.about = ''
    //         await user.save()
    //         res.json({message: 'Information removed', user})
    //     } catch (error) {
    //         res.status(400).json({message: 'Information removing error'})
    //     }
    // }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    }

    async getOneUser(req, res) {
        try {
            const {_id} = req.params
            const user = await User.findOne({_id})
            res.json(user)
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
        const token = generateToken(req.user.id, req.user.username, req.user.roles, req.user.avatar, req.user.about)
        return res.json({token})
    }
}

export default new authController()