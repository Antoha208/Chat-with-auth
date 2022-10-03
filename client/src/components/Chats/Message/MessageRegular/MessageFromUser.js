import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import moment from 'moment'


import ListItemText from '@material-ui/core/ListItemText'
import { InputBase, Button } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import SpellcheckRoundedIcon from '@material-ui/icons/SpellcheckRounded'


import styles from './MessageRegular.module.css'
import useStyles from './makeStyles'
import { cancelUpdating } from '../../../../store/messagesReducer'
import PictureAttachment from './PictureAttachment/PictureAttachment'
import OtherAttachment from './OtherAttachment/OtherAttachment'
import AvatarUser from './AvatarComp/AvatarUser'


const MessageFromUser = ({mess, editMessage, acceptMessage, states, localDispatch}) => {
    const classes = useStyles()
    const userStore = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (    
        <div className = {styles.content}>
            <AvatarUser />
            <div className = {styles.text__container}>
                <ListItemText>{userStore.username}</ListItemText>
                {mess.isUpdating ?
                    <div className = {styles.text__message}>
                        <div className={classes.paperAbout}>
                        {!mess.delete ? 
                            <InputBase
                                className={classes.about} 
                                value={states.newText || ''} 
                                onChange={(e) => editMessage(e)}
                            />
                        :
                            <div className = {styles.text__message}>
                                {mess.message}
                            </div>
                        }
                            <div>
                                <Button onClick = {() => acceptMessage(mess)}>
                                    <Tooltip title={t ('description.MessageAcceptTooltip')} arrow>
                                        <SpellcheckRoundedIcon className={styles.icon} />
                                    </Tooltip>
                                </Button>
                                <Button onClick = {() => dispatch(cancelUpdating(mess))}>
                                    <Tooltip title={t ('description.ChatListCloseTooltip')} arrow>
                                        <ClearRoundedIcon className={styles.icon} />
                                    </Tooltip>
                                </Button>
                            </div>
                        </div>
                    </div>
                :
                    <div className = {styles.text__message}>
                        {mess.message}
                        {mess.updatedAt !== undefined && (
                            <div className = {styles.text__correctTime}>{t ('description.MessageCorrectTime')} {moment(mess.updatedAt).format('hh:mm A')}</div>
                        )}
                    </div>
                }
                {mess.attachment !== '' && (
                    mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'jpg' || mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'png' ?
                        <PictureAttachment 
                            mess={mess}
                            zoom={states.zoom}
                            localDispatch={localDispatch}
                        />
                    :
                        <OtherAttachment 
                            mess={mess}
                        />
                )}
            </div>
            {mess.updatedAt === undefined && (
                <div className = {styles.text__time}>{moment(mess.key).format('hh:mm A')}</div>
            )}
        </div>
    )
}
                            
export default MessageFromUser