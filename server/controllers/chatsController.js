import User from '../models/User.js'
import Chat from '../models/Chat.js'


class chatsController {
    async createNewChat(req, res) {
        try {
            const {_id} = req.params
            const {ids, usernames, avatars} = req.body
            const user = await User.findOne({_id})
            const chatsColl = await Chat.find()

            const newChat = new Chat()
            ids.forEach(id => {
                newChat.ids.push(id)
            })

            usernames.forEach(username => {
                newChat.usernames.push(username)
            })

            avatars.forEach(avatar => {
                newChat.avatars.push(avatar)
            })
            
            const chatsIds = chatsColl.map(el => Object.values(el.ids.sort())) //массив из массивов всех имеющихся чатов у юзера
            const newIds = newChat.ids.sort() // массив из айдишников добавляемого нового чата
            const match = chatsIds.some(el => JSON.stringify(el) === JSON.stringify(newIds)) // проверяем наличие совпадений

            if (!match) {
                user.chats.push(newChat._id)
                const addToColl = await newChat.save()
                await user.save()
            } else {
                res.json('This chat has already created')
            }
            return res.json(newChat) 
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllChats(req, res) {
        try {
            const {_id} = req.params
            const {chats} = await User.findById({_id})
            const chatColl = await Chat.find()
            const getUserChats = chatColl.filter(elem => chats.includes(elem.id))
            const deleteFromChats = await Chat.deleteMany({_id: {$in : getUserChats}})

            const user = await User.findOne({_id})
            const deleteFromUser = await user.updateOne({$pullAll: {chats}})
            await user.save()
            res.json('All your chats is deleted')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOneChat(req, res) {
        try {
            const {_id, objectId} = req.params
            const user = await User.findOne({_id})
            const deleteFromUser = await user.updateOne({$pull: {chats: objectId}})
            await user.save()
            const deleteFromChats = await Chat.findOneAndDelete({_id: objectId})
            res.json({message: 'Chat deleted'})
        } catch (error) {
            console.log(error)
        }
    }

    // async updateChat (req, res) {
    //     try {
    //         const {_id} = req.params
    //         const {password} = req.body
    //         const errors = validationResult(req)
    //         if (!errors.isEmpty()) {
    //             return res.status(400).json({message: 
    //                 'Ошибка! Убедитесь в том, что поле password содержит от 6и до 12и символов.', errors})
    //         }
    //         const user = await User.findById(_id)
    //         const passwordCheck = bcryptjs.compareSync(password, user.password)
    //         if (passwordCheck) {
    //             return res.status(400).json({message: 'Поле password не было изменено'})
    //         }
    //         const newHashedPassword = bcryptjs.hashSync(password, 5)
    //         const updatedUser = await user.updateOne({$set: {password: newHashedPassword}})
    //         return res.json(updatedUser)
    //     } catch (error) {
    //         res.status(500).json(error.message)
    //     }
    // }

    async getAllChats(req, res) {
        try {
            const {_id} = req.params
            const {chats} = await User.findById({_id})
            const chatColl = await Chat.find()
            const getUserChats = chatColl.filter(elem => chats.includes(elem.id))
            res.json(getUserChats)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new chatsController()