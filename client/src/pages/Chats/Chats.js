import React from "react";


import { Card } from "@material-ui/core";


import ChatWindow from '../../components/Chats/ChatWindow/ChatWindow.js';
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import ChatList from "../../components/Chats/ChatList/ChatList.js";
import styles from './Chats.module.css'


const Chats = () => {

  return (
    <Card className={styles.card}>
      <NavBar />
      <div className = {styles.content}>
        <ChatList />
        <Card className = {styles.onechat}>
          <ChatWindow />
        </Card>
      </div>
    </Card>
  );
}

export default Chats
