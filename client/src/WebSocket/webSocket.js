import { setMessage, removeMessage, updateMessage, resetAllMessages } from '../store/messagesReducer.js'
import { resetCompanion } from '../store/companionReducer.js'
import { resetChat } from '../store/chatsReducer.js'
import { changeSocket } from '../store/authReducer.js'
import { deleteOneChat } from '../http/chatsApi.js'
import { addMessage } from '../http/messagesApi.js'
import { modelMessage } from '../WebSocket/Models.js'

let client

export const initWebSocket = () => {
  client = new WebSocket('https://chat-with-auth-server.vercel.app')
  return client
}

export const getWebSocket = () => {
  return client
}

export const socketOnMessage = (socket, dispatch, disconnectToo, id) => {
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data)
    switch (message.event) {
      case 'edit':
        dispatch(updateMessage(message))
        break;
      case 'deleteMess':
        dispatch(removeMessage(message))
        break;
      case 'deleteChat':
        dispatch(setMessage(message))
        break;
      case 'connection':
        dispatch(setMessage(message))
        break;
      case 'disconnect':
        if (message.id !== id) {
          disconnectToo()
        }
        break;
      default:
        dispatch(setMessage(message))
    }
  }
}

export const socketOnClose = (socket, dispatch) => {
  socket.onclose = () => {
    dispatch(resetCompanion())
    console.log('Socket закрыт')
  }
}

export const socketOnError = (socket) => {
  socket.onerror = () => {
    console.log('Socket error')
  }
}

export const disconnect = async (dispatch, setConnected, userStore, compStore, messagesStore, t) => {
  let socket = getWebSocket()
  const message = modelMessage('disconnect', userStore, compStore, undefined, undefined)
  socket.send(JSON.stringify(message))
  if (messagesStore.some(el => el.event === 'message')) {
    await addMessage(compStore.chatId, messagesStore.filter(el => el.event === 'message'))
    alert(`${t ('description.ChatWindowAlert4')}`)
  } 
  setConnected(false)
  dispatch(changeSocket())
}

export const fullDeletingChat = async (dispatch, userStore, chatId, chat, disconnect, setConnected, compStore, messagesStore, t) => {
  await deleteOneChat(userStore.id, chatId)
  dispatch(resetChat(chat))
  dispatch(resetAllMessages())
  dispatch(resetCompanion())
  if (disconnect !== undefined) {
    disconnect(dispatch, setConnected, userStore, compStore, messagesStore, t)
  }
}
