import pkg from 'mongoose'

const {Schema, model} = pkg

const User = new Schema ({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    avatar: {type: String},
    registrationDate: {type: Date, required: true, default: Date.now()}
})

export default model('User', User)