import React, { useState } from 'react'


import { Card } from '@material-ui/core'


import ChatWindow from '../../components/Chats/ChatWindow/ChatWindow/ChatWindow'
import NavBar from '../../components/NavBar/NavBar/NavBar'
import ChatList from '../../components/Chats/ChatList/ChatList/ChatList'
import { ContextMain } from './contextMain'
import styles from './Chats.module.css'


const Chats = () => {
  const [chats, setChats] = useState([])
  const [connected, setConnected] = useState(false)

  return (
    <ContextMain.Provider value = {{
      chats, connected, setChats, setConnected
    }}
    >
      <Card className={styles.card}>
        <NavBar />
        <div className = {styles.content}>
          <ChatList />
          <Card className = {styles.onechat}>
            <ChatWindow />
          </Card>
        </div>
      </Card>
    </ContextMain.Provider>
  )
}

export default Chats