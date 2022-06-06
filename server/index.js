import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { WebSocketServer } from 'ws'


import userRouter from './routes/userRouter.js'
import fileRouter from './routes/fileRouter.js'
import chatsRouter from './routes/chatsRouter.js'
import errorHandler from './middleware/ErrorHandlerMiddleware.js'

const PORT = process.env.PORT || 4000

const DB_URL = `mongodb+srv://Antoha208:Realtimechat@chatapp.c6phm.mongodb.net/Chat_with_auth?retryWrites=true&w=majority`

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static('static'))
app.use('/api', userRouter)
app.use('/api/files', fileRouter)
app.use('/api/chats', chatsRouter)
app.use(errorHandler)

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL)
        const server = app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`))
        
        const wss = new WebSocketServer({server})
        wss.on('connection', function connection(ws) {
            ws.on('message', function (message) {
                message = JSON.parse(message)
                ws.id = [message.chatId, message.id].sort()
                switch (message.event) {
                    case 'message':
                        privateMessage(message, ws.id)
                        break;
                    case 'connection':
                        broadcastMessage(message)
                        break;
                    case 'disconnect':
                        privateMessage(message, ws.id)
                        ws.close()
                        break;
                }
            })
        })
        
        function broadcastMessage(message) {
            wss.clients.forEach(client => {
                client.send(JSON.stringify(message))
            })
        }

        function privateMessage(message, id) {
            wss.clients.forEach(client => {
                if (JSON.stringify(client.id) === JSON.stringify(id)) {
                    client.send(JSON.stringify(message))
                }
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

startApp()