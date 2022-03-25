import { Schema, model } from 'express'


const Role = new Schema ({
    value: {type: String, unique: true, default: 'User' }
})

export default model('Role', Role)