import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import InputEmoji from 'react-input-emoji'


import useStyles from './makeStyles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import SendRoundedIcon from '@material-ui/icons/SendRounded'


import EMPTYCHAT from './img/EmptyChat.png'
import styles from './ChatWindow.module.css'
import Message from '../Message/Message'
import { setMessage, resetAllMessages, setArrayMessages, removeMessage } from '../../../store/messagesReducer'
import { getChats, deleteOneChat } from '../../../http/chatsApi'
import { deleteAllMessages, deleteAllMessagesFromChat } from '../../../http/messagesApi'
import { uploadAttachment, deleteAttachment } from '../../../http/fileApi'
import { setCompanion, resetCompanion } from '../../../store/companionReducer'
import { resetChat, setArrayChats } from '../../../store/chatsReducer'
import { addMessage } from '../../../http/messagesApi'


const ChatWindow = ({chats, setChats, showRequest, setShowRequest, showDelRequest, setShowDelRequest}) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const compStore = useSelector(state => state.companion.companion)
  const userStore = useSelector(state => state.user.user)
  const chatsStore = useSelector(state => state.chats.chats)
  const chat = chatsStore.find(el => el.ids.includes(compStore.id))
  const messagesStore = useSelector(state => state.messages.messages)
  const socket = useRef()
  const [text, setText] = useState('')
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [filePath, setFilePath] = useState('')
  // const [showRequest, setShowRequest] = useState(false)
  // const [showDelRequest, setShowDelRequest] = useState(false)
  const [showAttach, setShowAttach] = useState(false)
  const [zoomAttach, setZoomAttach] = useState(false)

  useEffect(() => {
    getChats(userStore.id).then(data => {
      if (data.length !== 0) {
        dispatch(setArrayMessages(data[0].messages))
      } else {
        console.log('empty')
      }
    })
  }, [])

  const upload = async (e) => {
    try {
      const file = e.target.files[0]
      await uploadAttachment(file).then(data => {
        setFilePath(data)
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const deleteFile = () => {
    deleteAttachment(filePath.fileName)
    setFilePath('')
    console.log('удалено успешно')
  }

  function connect() {
    socket.current = new WebSocket('ws://localhost:4000')

    socket.current.onopen = () => {
      setConnected(true)
      const message = {
        event: 'connection',
        username: userStore.username,
        key: Date.now(),
        id: userStore.id,
        chatId: compStore.id
      }
      // if (!messagesStore.some(el => el.event === 'connection')) {
        socket.current.send(JSON.stringify(message))
      // }
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log(message)
      setMessages(prev => [...prev, message])

      // if (message.event === 'request') {
      //   setShowRequest(true)
      // } else if (message.event === 'deleteChat') {
      //   setShowDelRequest(true)
      // }

      const filter = messagesStore.some(mess => mess.key === message.key)

      if (!filter) {
        if (message.event === 'deleteChat' && message.id !== userStore.id) {
            dispatch(setMessage(message))
        } else if (message.event !== 'deleteChat') {
          dispatch(setMessage(message))
        }
      }
  
      // if ((message.event === 'deleteChat' && message.username === userStore.username && message.answer === undefined)) {
      //   alert(`${t ('description.ChatWindowAlert5')}`)
      // }

      if ((message.event === 'disconnect' && message.username !== userStore.username)) {
        setConnected(false)
        alert(`${t ('description.ChatWindowAlert3')}`)
      }
    }

    socket.current.onclose = (event) => {
      
      alert(`${t ('description.ChatWindowAlert4')}`)
      
      dispatch(resetCompanion())
      dispatch(resetAllMessages())
      console.log('Socket закрыт')

      // if (chatsStore.length === 0 && messagesStore.length === 0) {
      //   alert('Данный чат удалён. После выхода со страницы данные будут утеряны')
      // }
    }

    socket.current.onerror = () => {
      console.log('Socket error')
    }
  }
  console.log(chat)
  function sendMessage (text) {
    const requestMessage = {
      event: 'request',
      key: Date.now(),
      message: text,
      id: userStore.id,
      username: userStore.username,
      avatar: userStore.avatar,
      chatId: '',
      compId: compStore.id
    }

    const message = {
      event: 'message',
      username: userStore.username,
      key: Date.now(),
      message: text,
      attachment: filePath,
      avatar: compStore.avatar,
      id: userStore.id,
      chatId: '',
      compId: compStore.id,
      isUpdate: false
    }

    if (messagesStore.some(el => el.event === 'disconnect' && el.username === compStore.username)) {
      alert(`${t ('description.ChatWindowAlert2')}`)
    } else if (!messagesStore.some(el => el.event === 'disconnect' && el.username === compStore.username)) {
      if (compStore.id !== null) {
        if (text !== '') {
          if (messagesStore.some(el => el.event === 'request')) {
            socket.current.send(JSON.stringify(message))
            setFilePath('')
          } else {
            socket.current.send(JSON.stringify(requestMessage))
          }
        }
      } else {
        alert(`${t ('description.ChatWindowAlert1')}`)
      }
    }
  }

  const applyToRequest = async (event) => {
    socket.current = new WebSocket('ws://localhost:4000')
    const mess = messagesStore.find(el => el.event === 'request')
    switch (event.target.innerHTML) {
      case 'Yes' || 'Да':
        socket.current.onopen = () => {
          const message = {
            event: 'request',
            username: userStore.username,
            key: Date.now(),
            answer: true,
            id: userStore.id,
            compId: mess.id,
            chatId: mess.chatId
          }
        socket.current.send(JSON.stringify(message))
          setChats(prev => [...prev, chatsStore.find(el => el.usernames.includes(mess.username))])
          dispatch(setCompanion(
            mess.id,
            mess.username,
            mess.roles, 
            mess.iat, 
            mess.exp,
            mess.avatar, 
            mess.about,
            mess.registrationDate
          ))
          socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            const filter = messagesStore.some(mess => mess.key === message.key)
            if (!filter && message.event !== 'deleteChat') {
              dispatch(setMessage(message))
            }
          }
        }
        break;
      case 'OK' || 'ОК':
        await deleteOneChat(userStore.id, chat._id)
        dispatch(resetChat(chat))                
        dispatch(resetAllMessages())
        dispatch(resetCompanion())
        break;
      case 'No' || 'Нет':
        socket.current.onopen = async () => {
          const message = {
            event: 'request',
            username: userStore.username,
            key: Date.now(),
            answer: false,
            id: mess.id,
            compId: userStore.id,
            chatId: mess.chatId
          }
        socket.current.send(JSON.stringify(message))
          const chatId = chatsStore.find(el => el.ids.includes(mess.id))
          await deleteOneChat(userStore.id, mess.chatId)
          dispatch(resetChat(chatId))
          dispatch(resetAllMessages())
          dispatch(resetCompanion())
        }
        break;
      case 'Cancel request' || 'Отменить запрос':
        socket.current.onopen = async () => {
          const message = {
            event: 'request',
            username: userStore.username,
            key: Date.now(),
            answer: 'cancel',
            id: mess.id,
            compId: mess.compId,
            chatId: mess.chatId
          }
        socket.current.send(JSON.stringify(message))
        socket.current.onmessage = (event) => {
          const message = JSON.parse(event.data)
          const filter = messagesStore.some(mess => mess.key === message.key)
          if (!filter && message.event !== 'request') {
            dispatch(setMessage(message))
          }
        }

        await deleteOneChat(userStore.id, mess.chatId)
        dispatch(resetChat(chat))
        dispatch(resetCompanion())
        dispatch(resetAllMessages())
        }
      }
      dispatch(removeMessage(messagesStore.find(el => el.event === 'request' && el.answer === undefined)))
  }

  const deletingChat = async (event) => {
    socket.current = new WebSocket('ws://localhost:4000')
    switch (event.target.innerHTML) {
      case 'Yes' || 'Да':
        socket.current.onopen = async () => {
          const message = {
            event: 'deleteChat',
            username: userStore.username,
            key: Date.now(),
            answer: true,
            id: userStore.id,
            compId: compStore.id,
            chatId: chat._id
          }
            socket.current.send(JSON.stringify(message))

            await deleteOneChat(userStore.id, chat._id)
            dispatch(resetChat(chat))                
            dispatch(resetAllMessages())
            dispatch(resetCompanion())
      }
        break;
      case 'OK' || 'ОК':
        await deleteOneChat(userStore.id, chat._id)
        dispatch(resetChat(chat))                
        dispatch(resetAllMessages())
        dispatch(resetCompanion())
        break;
      case 'No' || 'Нет':
        socket.current.onopen = () => {
          const message = {
            event: 'deleteChat',
            username: userStore.username,
            key: Date.now(),
            answer: false,
            id: userStore.id,
            compId: compStore.id,
            chatId: chat._id
          }
            socket.current.send(JSON.stringify(message))
      }
        break;
      case 'Cancel request' || 'Отменить запрос':
        socket.current.onopen = async () => {
          const message = {
            event: 'deleteChat',
            username: userStore.username,
            key: Date.now(),
            answer: 'cancel',
            id: chat.id,
            compId: chat.compId,
            chatId: chat._id
          }
          socket.current.send(JSON.stringify(message))
          socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            const filter = messagesStore.some(mess => mess.key === message.key)
            if (!filter && message.event !== 'deleteChat') {
              dispatch(setMessage(message))
            }
          }
        }
    }
    dispatch(removeMessage(messagesStore.find(el => el.event === 'deleteChat' && el.answer === undefined)))
  }

  const disconnect = async () => {
    const message = {
      event: 'disconnect',
      username: userStore.username,
      key: Date.now(),
      id: userStore.id,
      chatId: compStore.id
    }
    socket.current.send(JSON.stringify(message))
    await addMessage(chat._id, messagesStore.filter(el => el.event === 'message'))
    setConnected(false)
  }
  
  return (
    <div className = {styles.container}>
      <div className = {styles.card}>
        <div className = {styles.text}>
          {connected && messagesStore.some(el => el.event === 'message') ?
            <div className = {styles.sample}>
              <Tooltip title={t ('description.ChatWindowDisconnectTooltip')} arrow>
                <Button onClick={disconnect}><ClearRoundedIcon className={styles.icon} /></Button>
              </Tooltip>
            </div>
          :
            <div className = {styles.img__wrapper}>
              <img 
                src = {EMPTYCHAT}
                className = { styles.img } 
              />
              <div className = {styles.img__text}>{t ('description.ChatWindowEmpty')}</div>
            </div>
          }
          <div className = {styles.message__container}>
            <Message 
              connected={connected}
              connect={connect}
              showRequest={showRequest}
              applyToRequest={applyToRequest}
              deletingChat={deletingChat}
            />
          </div>
        </div>
        {showAttach && (
          <div className={styles.attachment} onMouseLeave={zoomAttach ? () => {setShowAttach(false); setZoomAttach(false)} : () => setShowAttach(false)}>
            {filePath === '' || undefined || null ?
              <></>
            :
              <div className={styles.attachment__wrapper}>
                {!zoomAttach && (
                  <div onClick={deleteFile}>
                    <Tooltip title={t ('description.ChatWindowDeleteAttachmentTooltip')} arrow>
                      <ClearRoundedIcon className={styles.attachment__icon} />
                    </Tooltip>
                  </div>
                )}
                <img 
                  className={zoomAttach ? styles.attachment__fileZoom : styles.attachment__file} 
                  src={`${process.env.REACT_APP_URL_API}` + filePath.fileName} 
                  onClick={zoomAttach ? () => setZoomAttach(false) : () => setZoomAttach(true)} 
                />
              </div>
            }
          </div>
        )}
      </div>
      <Paper component="form" className={classes.root}>
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={sendMessage}
          placeholder={t ('description.ChatWindowInput')}
        >
        </InputEmoji>
        <div className={classes.iconButton}>
          <input 
            accept="image/*, video/*, audio/*"
            className={classes.input}
            id="icon-button-file"  
            type="file"
            onChange = {e => upload(e)} 
          />
          <label htmlFor="icon-button-file">
            <IconButton 
              color="primary" 
              aria-label="upload picture" 
              component="span" 
              onMouseEnter={() => setShowAttach(true)}>
                <Tooltip title={t ('description.ChatWindowAttachTooltip')} arrow>
                  <AttachFileRoundedIcon className={styles.icon} />
                </Tooltip>
            </IconButton>
          </label>
        </div>
        <IconButton className={classes.iconButton} onClick={sendMessage}>
          <Tooltip title={t ('description.ChatWindowSendTooltip')} arrow>
            <SendRoundedIcon className={styles.icon} />
          </Tooltip>
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
      </Paper>
    </div>
  )
}

export default ChatWindow