import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import userRouter from './routes/userRouter.js'
import fileRouter from './routes/fileRouter.js'

const PORT = process.env.PORT || 4000

const DB_URL = `mongodb+srv://Antoha208:Realtimechat@chatapp.c6phm.mongodb.net/Chat_with_auth?retryWrites=true&w=majority`

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static('static'))
app.use('/api', userRouter)
app.use('/api/files', fileRouter)

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startApp()
