import React, { useState } from "react"


import { Card } from "@material-ui/core";


import ChatWindow from '../../components/Chats/ChatWindow/ChatWindow.js';
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import ChatList from "../../components/Chats/ChatList/ChatList.js";
import styles from './Chats.module.css'


const Chats = () => {
  const [chats, setChats] = useState([])
  const [showRequest, setShowRequest] = useState(false)
  const [showDelRequest, setShowDelRequest] = useState(false)

  return (
    <Card className={styles.card}>
      <NavBar />
      <div className = {styles.content}>
        <ChatList 
          chats={chats} 
          setChats={setChats} 
          showRequest={showRequest}
          setShowRequest={setShowRequest} 
          showDelRequest={showDelRequest} 
          setShowDelRequest={showDelRequest}
        />
        <Card className = {styles.onechat}>
          <ChatWindow 
            chats={chats} 
            setChats={setChats} 
            showRequest={showRequest}
            setShowRequest={setShowRequest}  
            showDelRequest={showDelRequest}
            setShowDelRequest={showDelRequest} 
          />
        </Card>
      </div>
    </Card>
  );
}

export default Chats