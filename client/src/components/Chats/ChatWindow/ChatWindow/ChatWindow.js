import React, { useCallback, useEffect, useReducer, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import i18n from '../../../Settings/Language/i18n.js'


import styles from './ChatWindow.module.css'
import Message from '../../Message/Message/Message.js'
import ChatDisconnection from '../ChatDisconnection/ChatDisconnection.js'
import EmptyChat from '../EmptyChat/EmptyChat.js'
import Attachment from '../Attachment/Attachment.js'
import BottomBar from '../BottomBar/BottomBar.js'
import { ContextMain } from '../../../../pages/Chats/contextMain.js'
import localReducer from './localReducer.js'
import { initWebSocket, getWebSocket, socketOnMessage, socketOnClose, socketOnError, disconnect, fullDeletingChat } from '../../../../WebSocket/webSocket.js'
import { modelMessage } from '../../../../WebSocket/Models.js'
import { setArrayMessages, removeMessage } from '../../../../store/messagesReducer.js'
import { setCompanion, resetCompanion, setChatId } from '../../../../store/companionReducer.js'
import { changeSocket } from '../../../../store/authReducer.js'
import { getChats } from '../../../../http/chatsApi.js'


const ChatWindow = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.isAuth)
  const compStore = useSelector(state => state.companion.companion)
  const userStore = useSelector(state => state.user.user)
  const chatsStore = useSelector(state => state.chats.chats)
  const messagesStore = useSelector(state => state.messages.messages) 
  const chat = chatsStore.find(el => el._id === compStore.chatId)
  const { setChats, connected, setConnected } = useContext(ContextMain)
  const [states, localDispatch] = useReducer(localReducer, {messages: [], filePath: '', showAttach: false, zoomAttach: false})

  const loadChats = useCallback(() => {
    getChats(userStore.id).then(data => {
      if (data.length !== 0) {
        dispatch(setArrayMessages(data[0].messages))
      }
    })
  }, [])

  const connection = useCallback(() => {
    if (!auth.socket) {
      connect()
    }
  }, [auth.socket])

  useEffect(() => {
    loadChats()
    if (userStore.language.includes('Russian')) {
      i18n.changeLanguage('ru')
    } else {
      i18n.changeLanguage('en')
    }
  }, [loadChats, userStore.language])

  useEffect(() => {
      window.addEventListener('unload', handleClosing)
    return () => {
      window.removeEventListener('unload', handleClosing)
    }
  })

  useEffect(() => {
    connection()
  }, [connection])

  const handleClosing = () => {
    if (connected) {
      disconnect(dispatch, setConnected, userStore, compStore, messagesStore, t)
    }
  }
  
  function connect() {
    let socket = initWebSocket()
    socket.onopen = () => {
      setConnected(true)
      dispatch(changeSocket())
      const message = modelMessage('connection', userStore)
      socket.send(JSON.stringify(message))
    }
    socketOnMessage(socket, dispatch, disconnectToo, userStore.id)
    socketOnClose(socket, dispatch)
    socketOnError(socket)
  }
  
  const sendMessage = (text) => {
    let socket = getWebSocket()
    const requestMessage = modelMessage('request', userStore, compStore, text)
    const message = modelMessage('message', userStore, compStore, text)
    if (states.filePath !== '') {
      message.attachment = states.filePath
    }

    if (compStore.id !== null) {
      if (text !== '') {
        switch (messagesStore.some(el => el.event === 'disconnect' && el.username === compStore.username)) {
          case true && true:
            alert(`${t ('description.ChatWindowAlert2')}`)
            break;
          case false && true:
            switch (messagesStore.some(el => el.event === 'request' && el.answer === true)) {
              case true && true:
                socket.send(JSON.stringify(message))
                localDispatch({type: 'filePath', payload: ''})
                break;
              case false && false:
                socket.send(JSON.stringify(requestMessage))
                break;
              default:
                alert(`${t ('description.ChatWindowAlert6')}`)
                break;
            }
            break;
          default:
            break;
        }
      } 
    } else {
      alert(`${t ('description.ChatWindowAlert1')}`)
    }
  }

  const applyToRequest = useCallback(async (event) => {
    let socket = getWebSocket()
    const mess = messagesStore.find(el => el.event === 'request')
    switch (event.target.innerHTML) {
      case `${t ('description.MessageRequest6')}`:
        dispatch(setCompanion(mess.compStoreInfo))
        dispatch(setChatId(mess.chatId))
        const messageTrue = modelMessage('request', userStore, mess, undefined, true)
        socket.send(JSON.stringify(messageTrue))
        setChats(prev => [...prev, chatsStore.find(el => el.usernames.includes(mess.username))])
        break;
      case `${t ('description.MessageDeletingChat7')}`:
        fullDeletingChat(dispatch, userStore.id, mess.chatId, chat)
        break;
      case `${t ('description.MessageRequest7')}`:
        const messageFalse = modelMessage('request', userStore, mess, undefined, false)
        socket.send(JSON.stringify(messageFalse))
        fullDeletingChat(dispatch, userStore.id, mess.chatId, chat)
        break;
      case `${t ('description.MessageRequest3')}`:
        const messageCancel = modelMessage('request', userStore, mess, undefined, 'cancel')
        socket.send(JSON.stringify(messageCancel))
        fullDeletingChat(dispatch, userStore.id, mess.chatId, chat)
        break;
      default:
        break;
      }
      dispatch(removeMessage(messagesStore.find(el => el.event === 'request' && el.answer === undefined)))
  }, [messagesStore.some(el=>el.event === 'request')])

  const deletingChat = useCallback(async (event) => {
    let socket = getWebSocket()
    const mess = messagesStore.find(el => el.event === 'deleteChat')
    switch (event.target.innerHTML) {
      case `${t ('description.MessageRequest6')}`:
        const messageTrue = modelMessage('deleteChat', userStore, mess, undefined, true)
        socket.send(JSON.stringify(messageTrue))
        fullDeletingChat(dispatch, userStore, mess.chatId, chat, disconnect, setConnected, compStore, messagesStore, t)
        break;
      case `${t ('description.MessageDeletingChat7')}`:
        fullDeletingChat(dispatch, userStore, mess.chatId, chat, disconnect, setConnected, compStore, messagesStore, t)
        break;
      case `${t ('description.MessageRequest7')}`:
        const messageFalse = modelMessage('deleteChat', userStore, mess, undefined, false)
          socket.send(JSON.stringify(messageFalse))
        break;
      case `${t ('description.MessageRequest3')}`:
        const messageCancel = modelMessage('deleteChat', userStore, mess, undefined, 'cancel')
        socket.send(JSON.stringify(messageCancel))
        break;
      default:
        break;
    }
    dispatch(removeMessage(messagesStore.find(el => el.event === 'deleteChat' && el.answer === undefined)))
  }, [messagesStore.some(el=>el.event === 'deleteChat')])

  const disconnectToo = () => {
    dispatch(resetCompanion())
    alert(`${t ('description.ChatWindowAlert3')}`)
    setConnected(false)
  }
  
  return (
    <div className = {styles.container}>
      <div className = {styles.card}>
        <div className = {styles.text}>
          {compStore.id !== null && messagesStore.some(el => el.event === 'message') ?
            <ChatDisconnection 
              setConnected={setConnected}
            />
          :
            <EmptyChat />
          }
          <div className = {styles.message__container}>
            <Message 
              applyToRequest={applyToRequest}
              deletingChat={deletingChat}
            />
          </div>
        </div>
        {states.showAttach && (
          <Attachment
            states={states}
            localDispatch={localDispatch} 
          />
        )}
      </div>
      <BottomBar 
        localDispatch={localDispatch}
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default ChatWindow
