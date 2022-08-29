import bcryptjs from 'bcrypt'

import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import {secret} from '../config.js'
import Role from '../models/Role.js'
import User from '../models/User.js'
import Theme from '../models/Theme.js'
import Language from '../models/Language.js'

const generateToken = (id, username, roles, theme, language, avatar, about, registrationDate, chats) => {
    const payload = {
        id,
        username,
        roles,
        theme,
        language,
        avatar,
        about,
        registrationDate,
        chats
    }
    return jwt.sign(payload, secret, {expiresIn: '6h'})
}

class userController {
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
            const userRole = await Role.findOne({value: 'User'})
            const userTheme = await Theme.findOne({value: 'Dark'})
            const userLanguage = await Language.findOne({value: 'English'})
            const avatar = ''
            const about = ''
            const registrationDate = Date.now()
            // const chats = await Chat.find()
            const chats = []
            const user = new User({
                username, 
                password: hashedPassword, 
                roles: [userRole.value], 
                theme: [userTheme.value],
                language: [userLanguage.value],
                avatar: avatar, 
                about: about, 
                registrationDate: registrationDate,
                chats: chats
            })
            await user.save()
            const token = generateToken(
                user._id, 
                user.username, 
                user.roles,
                user.theme,
                user.language, 
                user.avatar, 
                user.about, 
                user.registrationDate,
                user.chats
            )
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
            const token = generateToken(
                user._id, 
                user.username, 
                user.roles, 
                user.theme,
                user.language,
                user.avatar, 
                user.about)
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
            const user = await User.findOneAndDelete({_id})
            res.json(`user was deleted`)
        } catch (error) {
            console.log(error)
        }
    }

    async checkPassword (req, res) {
        try {
            const {_id} = req.params
            const {password} = req.body
            const user = await User.findById({_id})
            const passwordCheck = await bcryptjs.compare(password, user.password)
            if (!passwordCheck) {
                return res.status(400).json({message: 'Пароль введен неверно!'})
            }

            return res.json(passwordCheck) 
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async updateCheckedUserUsername (req, res) {
        try {
            const {_id} = req.params
            const {username} = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 
                    'Ошибка! Убедитесь в том, что поле Username не пустое и содержит два слова.', errors})
            }
            const condidate = await User.findOne({username})
                if (condidate) {
                    return res.status(400).json({message: 'Поле username не было изменено или занято'})
                }
            const user = await User.findById(_id)
            const updatedUser = await user.updateOne({$set: {username: username}})
            const token = generateToken(
                user._id, 
                username, 
                user.roles, 
                user.theme,
                user.language,
                user.avatar, 
                user.about)
            return res.json({token}) 
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async updateCheckedUserPassword (req, res) {
        try {
            const {_id} = req.params
            const {password} = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 
                    'Ошибка! Убедитесь в том, что поле password содержит от 6и до 12и символов.', errors})
            }
            const user = await User.findById(_id)
            const passwordCheck = bcryptjs.compareSync(password, user.password)
            if (passwordCheck) {
                return res.status(400).json({message: 'Поле password не было изменено'})
            }
            const newHashedPassword = bcryptjs.hashSync(password, 5)
            const updatedUser = await user.updateOne({$set: {password: newHashedPassword}})
            return res.json(updatedUser)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async setTheme (req, res) {
        try {
            const {_id} = req.params
            const user = await User.findById(_id)

            if (user.theme[0] === "Dark") {
                const theme = await Theme.findOne({value: 'Light'})
                const string = theme.toString().match(/\b[D-L]\w+/gm)
                const updatedUser = await user.updateOne({$set: {theme: string}})
                await user.save()
                return res.json(user.theme)
            } else {
                const theme = await Theme.findOne({value: 'Dark'})
                const string = theme.toString().match(/\b[D-L]\w+/gm)
                const updatedUser = await user.updateOne({$set: {theme: string}})
                await user.save()
                return res.json(user.theme)
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async setLanguage (req, res) {
        try {
            const {_id} = req.params
            const user = await User.findById(_id)

            if (user.language[0] === "English") {
                const language = await Language.findOne({value: 'Russian'})
                const string = language.toString().match(/\b[A-NP-Z]\w+/gm)
                const updatedUser = await user.updateOne({$set: {language: string}})
                return res.json(string)
            } else {
                const language = await Language.findOne({value: 'English'})
                const string = language.toString().match(/\b[A-NP-Z]\w+/gm)
                const updatedUser = await user.updateOne({$set: {language: string}})
                return res.json(string)
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async check(req, res) {
        const token = generateToken(
            req.user.id, 
            req.user.username, 
            req.user.roles, 
            req.user.theme,
            req.user.language,
            req.user.chats,
            req.user.iat,
            req.user.exp,
            req.user.avatar, 
            req.user.about,
        )
        return res.json({token})
    }
}

export default new userController()