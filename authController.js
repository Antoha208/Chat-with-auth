import Role from './models/Role.js'
//import User from '/models/User.js'

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
            const userRole = new Role()
            const adminRole = new Role({value: 'Admin'})
            await userRole.save()
            await adminRole.save()
            res.json('server is working')
        } catch (error) {
            console.log(error)
        }
    }
}

export default new authController()