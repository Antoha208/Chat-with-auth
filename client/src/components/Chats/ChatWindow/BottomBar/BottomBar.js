import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import InputEmoji from 'react-input-emoji'


import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'


import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'
import styles from './BottomBar.module.css'
import { uploadAttachment } from '../../../../http/fileApi.js'


const BottomBar = ({localDispatch, sendMessage}) => {
    const classes = useClasses(stylesJS)
    const { t } = useTranslation()
    const [text, setText] = useState('')

    const upload = async (e) => {
        try {
          const file = e.target.files[0]
          await uploadAttachment(file).then(data => {
            localDispatch({type: 'filePath', payload: data})
          })
        } catch (error) {
          alert(error.message)
        }
    }

    return (
        <Paper component="form" className={classes.root}>
            <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                onEnter={sendMessage}
                placeholder={t ('description.ChatWindowInput')}>
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
                        onMouseEnter={() => localDispatch({type: 'showAttach'})}
                    >
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
    )
}

export default BottomBar
