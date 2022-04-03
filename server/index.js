import express from 'express'
import mongoose from 'mongoose'

import router from './authRouter.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/auth', router)

const DB_URL = `mongodb+srv://Antoha208:Realtimechat@chatapp.c6phm.mongodb.net/Chat_with_auth?retryWrites=true&w=majority`

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startApp()
