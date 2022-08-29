import Chat from '../models/Chat.js'
import Message from '../models/Message.js'


class messageController {
    async addMessage(req, res) {
        try {
            const {_id} = req.params
            const messages = req.body
            const findChat = await Chat.findOne({_id})
            const messColl = await Message.find()
            
            messages.event.forEach(message => {
                const newMessage = new Message({
                    event: message.event, 
                    username: message.username,
                    key: message.key,
                    message: message.message,
                    attachment: message.attachment, 
                    avatar: message.avatar, 
                    id: message.id,
                    compId: message._id,
                    chatId: _id,
                    isUpdate: message.isUpdate,
                    time: message.time
                })

                if (messColl.find(el => JSON.stringify(el) === JSON.stringify(message))) {
                    console.log(match)
                } else {
                    newMessage.save()
                    findChat.messages.push(newMessage)   
                }
            })
                   
            const addToColl = await findChat.save()
            return res.json(addToColl)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllMessagesFromChat(req, res) {
        try {
            const {_id} = req.params
            const {messages} = await Chat.findById({_id})
            const chat = await Chat.findById({_id})
            const deleteFromMessages = await Message.deleteMany({chatId: _id})
            const deleteFromChat = await chat.updateOne({$pullAll: {messages}})
            await chat.save()
            res.json('All your messages from chat is deleted')
        } catch (error) {
            console.log(error)
        }
    }

    // async deleteAllMessages(req, res) {
    //     try {
    //         const {_id} = req.params
    //         const user = await User.findById({_id})
    //         res.json(user)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // async deleteOneMessage(req, res) {
    //     try {
    //         const {_id, objectId} = req.params
    //         const chat = await Chat.findOne({_id})

    //         const messageYouNeed = chat.messages.find(el => el._id == objectId)
    //         const deleteFromChat = await chat.updateOne({$pull: {messages: messageYouNeed}})
    //         await chat.save()
    //         const deleteFromMessages = await Message.findOneAndDelete({_id: objectId})
    //         res.json({message: 'Message deleted'})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // async updateOneMessage (req, res) {
    //     try {
    //         const {_id, objectId} = req.params
    //         const {message} = req.body
    //         const time = Date.now()
    //         const chat = await Chat.findById(_id)

    //         const messageYouNeed = chat.messages.find(el => el._id == objectId)
    //         const messageId = messageYouNeed._id

    //         const updateInChat = await Chat.updateOne({'messages._id': messageId}, {'$set': {'messages.$.message': message, 'messages.$.time': time}})
            
    //         const mess = await Message.findOne({_id: objectId})
    //         const updateInMessages = await mess.updateOne({$set: {message: message, time: time}})
    //         return res.json({message})
    //     } catch (error) {
    //         res.status(500).json(error.message)
    //     }
    // }

    async getAllMessages(req, res) {
        try {
            const {_id} = req.params
            const {messages} = await Chat.findById({_id})
            res.json(messages)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new messageController()