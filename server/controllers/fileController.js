import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import * as fs from 'fs';

import User from '../models/User.js'


class fileController {
    async uploadAvatar(req, res) {
        try {
            const file = req.files.file
            const user = await User.findById(req.user.id)
            const avatarName = uuidv4() + '.jpg'
            file.mv(path.resolve('static', avatarName))
            user.avatar = avatarName
            await user.save()
            res.json({message: 'Avatar uploaded', user})
        } catch (error) {
            res.status(400).json({message: 'Avatar uploading error'})
        }
    }

    async deleteAvatar(req, res) {
        try {
            const user = await User.findById(req.user.id)
            fs.unlinkSync('static' + '\\' + user.avatar)
            user.avatar = ''
            await user.save()
            res.json({message: 'Avatar deleted', user})
        } catch (error) {
            res.status(400).json({message: 'Avatar deleting error'})
        }
    }

    async uploadAttachment(req, res) {
        try {
            const file = req.files.file
            const extension = file.name.match(/[^.]+$/gm)[0]
            const fileName = uuidv4() + `.${extension}`
            file.mv(path.resolve('static', fileName))
            
            res.json({message: 'File uploaded', fileName})
        } catch (error) {
            res.status(400).json({message: 'File uploading error'})
        }
    }

    async deleteAttachment(req, res) {
        try {
            const {file} = req.params
            fs.unlinkSync('static' + '\\' + file)
           
            res.json({message: 'File deleted'})
        } catch (error) {
            res.status(400).json({message: 'File deleting error'})
        }
    }
}

export default new fileController()
