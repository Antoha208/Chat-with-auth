import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import moment from 'moment'


import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { InputBase, Button } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import SpellcheckRoundedIcon from '@material-ui/icons/SpellcheckRounded'


import styles from './MessageRegular.module.css'
import useStyles from './makeStyles'
import PictureAttachment from './PictureAttachment/PictureAttachment'
import OtherAttachment from './OtherAttachment/OtherAttachment'


const MessageFromUser = ({mess, editMessage, acceptMessage, zoom, setZoom, newText}) => {
    const classes = useStyles()
    const userStore = useSelector(state => state.user.user)
    const { t } = useTranslation()

    return (    
        <div className = {styles.content}>
            <ListItemAvatar>
                <Avatar
                    src={ userStore.avatar !== '' ?
                        `${process.env.REACT_APP_URL_API + userStore.avatar}`
                    :
                        ''
                    }
                />
            </ListItemAvatar>
            <div className = {styles.text__container}>
                <ListItemText>{userStore.username}</ListItemText>
                {mess.isUpdate ?
                    <div className = {styles.text__message}>
                        <div className={classes.paperAbout}>
                            <InputBase
                                className={classes.about} 
                                value={newText || ''} 
                                onChange={(e) => editMessage(e)}
                            />
                            <div>
                                <Button onClick = {()=>acceptMessage(mess)}>
                                    <Tooltip title={t ('description.MessageAcceptTooltip')} arrow>
                                        <SpellcheckRoundedIcon className={styles.icon} />
                                    </Tooltip>
                                </Button>
                            </div>
                        </div>
                    </div>
                :
                    <div className = {styles.text__message}>
                        {mess.message}
                        {mess.updatedAt !== undefined && (
                            <div className = {styles.text__correctTime}>{t ('description.MessageCorrectTime')}{moment(mess.updatedAt).format('hh:mm A')}</div>
                        )}
                    </div>
                }
                {mess.attachment !== '' && (
                    mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'jpg' || mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'png' ?
                        <PictureAttachment 
                            mess={mess}
                            zoom={zoom}
                            setZoom={setZoom}
                        />
                    :
                        <OtherAttachment 
                            mess={mess}
                        />
                )}
            </div>
            <div className = {styles.text__time}>{moment(mess.key).format('hh:mm A')}</div>
        </div>
    )
}
                            
export default MessageFromUser