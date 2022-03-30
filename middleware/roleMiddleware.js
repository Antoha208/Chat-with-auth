import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

export function roleMiddleware(roles) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]

            if (!token) {
                return res.status(401).json({message: 'Пользователь не авторизован'})
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let isRole = false
            userRoles.forEach(role => {
                    if (roles.includes(role)) {
                        isRole = true
                    }
                })

            if (!isRole) {
                return res.status(402).json({message: 'У вас нет доступа'})
            }

            return next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({message: 'Пользователь не авторизован епта'})
        }
    }
}