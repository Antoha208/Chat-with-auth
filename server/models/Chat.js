import pkg from 'mongoose'

const {Schema, model} = pkg

const Chat = new Schema ({
    ids: {type: Array, unique: false},
    usernames: {type: Array, unique: false},
    avatars: {type: Array, unique: false},
    messages: [{type: Object, ref: 'Message'}],
    createdAt: {type: Date, default: Date.now()}
})

export default model('Chat', Chat)