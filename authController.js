import {User} from './models/User.js'
import {Role} from './models/Role.js'

class authController {
    async registration(req, res) {
        try {
            
        } catch (error) {
            
        }
    }

    async login(req, res) {
        try {
            
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