import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'


import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'


import styles from './Message.module.css'


const Message = ({messages}) => {
    const userStore = useSelector(state => state.user.user)
    const compStore = useSelector(state => state.companion.companion)
    const messagesStore = useSelector(state => state.messages.messages)

    useEffect(() => {
        console.log(messages)
      }, [])


    return (
        <div>
            {messages.map(mess => 
                <div className = {styles.message} key={mess.key}>
                    {mess.event === 'connection' ?
                        <div className = {styles.message__connect}>Пользователь {mess.username} подключился</div>
                    :
                        mess.event === 'disconnect' ?
                            <div className = {styles.message__connect}>Пользователь {mess.username} вышел из сети</div>
                        :    
                            <div className = {mess.username === userStore.username ? styles.message__left : styles.message__right}>
                                <div key={mess.key} className = {styles.container}>
                                    {mess.username === userStore.username ?
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
                                                <div className = {styles.text__message}>{mess.message}</div>
                                            </div>
                                            <div className = {styles.text__time}>{moment.unix(mess.key).format('hh:mm')}</div>
                                        </div>
                                    :
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
                                            </div>
                                            <div className = {styles.text__time}>{moment.unix(mess.key).format('hh:mm')}</div>
                                        </div>
                                    }
                                </div>
                            </div>   
                    }
                </div>
            )}
        </div>
    )
}

export default Message