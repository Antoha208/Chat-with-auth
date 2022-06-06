import pkg from 'mongoose'

const {Schema, model} = pkg

const User = new Schema ({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    theme: [{type: String, ref: 'Theme'}],
    language: [{type: String, ref: 'Language'}],
    avatar: {type: String},
    about: {type: String, maxlength: 20},
    registrationDate: {type: Date, required: true, default: Date.now()},
    iat: {type: Number, required: true, default: 0},
    exp: {type: Number, required: true, default: 0},
    chats: [{type: String, ref: 'Chat'}]
})

export default model('User', User)