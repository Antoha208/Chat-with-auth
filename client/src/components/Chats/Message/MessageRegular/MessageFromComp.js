import React from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'


import ListItemText from '@mui/material/ListItemText'


import styles from './MessageRegular.module.css'
import PictureAttachment from './PictureAttachment/PictureAttachment.js'
import OtherAttachment from './OtherAttachment/OtherAttachment.js'
import AvatarComp from './AvatarComp/AvatarComp.js'

const MessageFromComp = ({mess, states, localDispatch}) => {
    const { t } = useTranslation()

    return (    
        <div className = {styles.content}>
            <AvatarComp />
            <div className = {styles.text__container}>
                <ListItemText>{mess.username}</ListItemText>
                <div className = {styles.text__message}>
                    {mess.message}
                    {mess.updatedAt !== undefined && (
                        <div className = {styles.text__correctTime}>{t ('description.MessageCorrectTime')} {moment(mess.updatedAt).format('hh:mm A')}</div>
                    )}
                </div>
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
                            
export default MessageFromComp
