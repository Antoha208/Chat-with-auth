import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import InputEmoji from 'react-input-emoji'


import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded'
import SendRoundedIcon from '@material-ui/icons/SendRounded'


import useStyles from './makeStyles'
import styles from './BottomBar.module.css'
import { uploadAttachment } from '../../../../http/fileApi'


const BottomBar = ({localDispatch, sendMessage}) => {
    const classes = useStyles()
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