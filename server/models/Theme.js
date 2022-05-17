import pkg from 'mongoose'

const {Schema, model} = pkg

const Theme = new Schema ({
    value: {type: String, default: 'Dark'},
})

export default model('Theme', Theme)