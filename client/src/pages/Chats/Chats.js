import React from "react";


import { Card } from "@material-ui/core";


import ChatWindow from '../../components/Chats/ChatWindow/ChatWindow.js';
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import ChatList from "../../components/Chats/ChatList/ChatList.js";
import styles from './Chats.module.css'
import useStyles from './makeStyles'


const Chats = () => {
  const classes = useStyles()

  return (
    <Card className={styles.card}>
      <NavBar />
      <div className = {styles.content}>
        <ChatList />
        <div className = {styles.onechat}>
          <ChatWindow />
        </div>
      </div>
    </Card>
  );
}

export default Chats;
