import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'


import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'


import styles from './MessageRegular.module.css'
import PictureAttachment from './PictureAttachment/PictureAttachment'
import OtherAttachment from './OtherAttachment/OtherAttachment'


const MessageFromComp = ({mess, zoom, setZoom}) => {
    const compStore = useSelector(state => state.companion.companion)

    return (    
        <div className = {styles.content}>
            <ListItemAvatar>
                <Avatar
                    src={ compStore.avatar !== '' ?
                        `${process.env.REACT_APP_URL_API + compStore.avatar}`
                    :
                        ''
                    }
                />
            </ListItemAvatar>
            <div className = {styles.text__container}>
                <ListItemText>{mess.username}</ListItemText>
                <div className = {styles.text__message}>{mess.message}</div>
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
                            
export default MessageFromComp