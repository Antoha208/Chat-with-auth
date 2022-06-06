import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import InputEmoji from 'react-input-emoji'


import useStyles from './makeStyles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded'


import SendRoundedIcon from '@material-ui/icons/SendRounded'
import styles from './ChatWindow.module.css'
import Message from '../Message/Message'
import { setMessage, resetMessage } from '../../../store/messagesReducer'

const ChatWindow = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const compStore = useSelector(state => state.companion.companion)
  const userStore = useSelector(state => state.user.user)
  const messagesStore = useSelector(state => state.messages.messages)
  const [ text, setText ] = useState('')
  const socket = useRef()
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([])


  useEffect(() => {
    console.log(messages)
  }, [])


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
      
      socket.current.send(JSON.stringify(message))
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages(prev => [...prev, message])

      const filter = messagesStore.some(mess => mess.key === message.key)

      if (!filter) {
        dispatch(setMessage(message))
      }
    }

    socket.current.onclose = (event) => {
      dispatch(resetMessage())
      console.log('Socket закрыт')
    }

    socket.current.onerror = () => {
      console.log('Socket error')
    }
  }
  
  function sendMessage (text) {
    const message = {
      event: 'message',
      username: userStore.username,
      key: Date.now(),
      message: text,
      avatar: compStore.avatar,
      id: userStore.id,
      chatId: compStore.id
    }

    if (!messagesStore.some(el => el.event === 'disconnect')) {
      socket.current.send(JSON.stringify(message))
    } else {
      alert('Ваш собеседник вышел из сети')
    }
  }

  function disconnect () {
    setConnected(false)
      const message = {
        event: 'disconnect',
        username: userStore.username,
        key: Date.now(),
        id: userStore.id,
        chatId: compStore.id
      }

      socket.current.send(JSON.stringify(message))
  }

  
  return (
    <div className = {styles.container}>
      <div className = {styles.card}>
        <div className = {styles.text}>
          <div className = {styles.sample}>
            <div>CONNECTING..</div>
            <Button onClick={connect}>Connect</Button>
            <Button onClick={disconnect}>disconnect</Button>
          </div>
          <div className = {styles.message__container}>
            <Message messages={messages} />
          </div>
        </div>
      </div>
      <Paper component="form" className={classes.root}>
      <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={sendMessage}
          placeholder={t ('description.ChatWindowInput')}
        />
        <div className={classes.iconButton}>
          <input 
            accept="image/*" 
            className={classes.input}
            id="icon-button-file"  
            type="file" 
          />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <AttachFileRoundedIcon className={styles.icon} />
            </IconButton>
          </label>
        </div>
        <IconButton className={classes.iconButton} onClick={sendMessage}>
          <SendRoundedIcon className={styles.icon} />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
      </Paper>
    </div>
  )

}

export default ChatWindow