import React, { useState } from 'react'


import Card from '@mui/material/Card'


import ChatWindow from '../../components/Chats/ChatWindow/ChatWindow/ChatWindow.js'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import ChatList from '../../components/Chats/ChatList/ChatList/ChatList.js'
import { ContextMain } from './contextMain.js'
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
        <NavBar 
          setConnected={setConnected}
        />
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
