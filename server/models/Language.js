import pkg from 'mongoose'

const {Schema, model} = pkg

const Language = new Schema ({
    value: {type: String, default: 'English'},
})

export default model('Language', Language)