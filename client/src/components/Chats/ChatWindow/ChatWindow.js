import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
//import Picker from 'emoji-picker-react'
import InputEmoji from 'react-input-emoji'

import useStyles from './makeStyles';
import Paper from '@material-ui/core/Paper';
//import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
//import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
//import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import styles from './ChatWindow.module.css'

const ChatWindow = () => {
  const { t } = useTranslation()
  //const [chosenEmoji, setChosenEmoji] = useState(null)
  const [ text, setText ] = useState('')
  //const [showEmoji, setShowEmoji] = useState(null)

  const classes = useStyles()

  // const showEmojiBar = (event) => {
  //   setShowEmoji(event.currentTarget)
  // }

  // const hideEmojiBar = (event) => {
  //   setShowEmoji(null)
  // }

  // const onEmojiClick = (event, emoji) => {
  //   setChosenEmoji(emoji);
  // };

  function handleOnEnter (text) {
    console.log('enter', text)
  }

  return (
    <div className = {styles.container}>
      <div className = {styles.card}>
        <div className = {styles.text}>
        
        </div>
      </div>
      <Paper component="form" className={classes.root}>
      <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder={t ('description.ChatWindowInput')}
        />
          {/* {chosenEmoji ? (
            <span>You chose: {chosenEmoji.emoji}</span>
          ) : (
            <span>No emoji Chosen</span>
          )} */}
          {/* <Picker onEmojiClick={onEmojiClick} /> */}
        {/* <IconButton 
          className={classes.iconButton}
          onClick={showEmojiBar}
          onEmojiClick={onEmojiClick}
        >
          {showEmoji ?
            <div className={styles.emojiBar}>
              <ClickAwayListener onClickAway={hideEmojiBar}>
                <div className={styles.picker}>
                  <Picker onEmojiClick={onEmojiClick} />  
                </div>
              </ClickAwayListener> 
              <EmojiEmotionsRoundedIcon />
            </div>
          :
            <EmojiEmotionsRoundedIcon />
          }
        </IconButton> */}
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
        <IconButton className={classes.iconButton}>
          <SendRoundedIcon className={styles.icon} />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
      </Paper>
    </div>
  )

}

export default ChatWindow;