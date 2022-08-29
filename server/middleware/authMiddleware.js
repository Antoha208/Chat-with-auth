import jwt from 'jsonwebtoken'
import {secret} from '../config.js'

export function authMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
        const decodedToken = jwt.verify(token, secret)
        req.user = decodedToken
        return next()
    } catch (error) {
        return res.status(401).json({message: 'Пользователь не авторизован'})
    }
}