import pkg from 'mongoose'

const {Schema, model} = pkg

const Message = new Schema ({
    event: {type: String},
    username: {type: String},
    key: {type: Date, default: Date.now()},
    message: {type: String},
    attachment: {type: String},
    avatar: {type: String},
    id: {type: String},
    chatId: {type: String},
    isUpdated: {type: Boolean, default: false},
    time: {type: Date, default: Date.now()}
})

export default model('Message', Message)

