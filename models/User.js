import { Schema, model } from 'express'


const User = new Schema ({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: [{type: String, ref: 'Role'}]
})

export default model('User', User)