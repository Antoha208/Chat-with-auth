import React, { useState, useContext, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'


import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'


import styles from './ChatTitle.module.css'
import AvatarComp from '../AvatarComp/AvatarComp.js'
import ModalComp from '../ModalComp/ModalComp.js'
import MenuComp from '../MenuComp/MenuComp.js'
import { Context } from '../../context.js'
import { getWebSocket, socketOnMessage } from '../../../../WebSocket/webSocket.js'
import { modelMessage } from '../../../../WebSocket/Models.js'


const ChatTitle = () => {
    const { TabPanel, filterChats, states, localDispatch } = useContext(Context)
    const userStore = useSelector(state => state.user.user)
    const compStore = useSelector(state => state.companion.companion)
    const chatsStore = useSelector(state => state.chats.chats)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [avatar, setAvatar] = useState(false)

    const deleteChat = async () => {
        try {
            if (compStore.id === null) {
                alert(`${t ('description.ChatTitleDeleteChat')}`)
            } else {
                let socket = getWebSocket()
                const emptyTab = chatsStore.find((el, index)=> index === 0)
                const message = modelMessage('deleteChat', userStore, compStore, undefined, undefined)
                if (states.chosenTab._id === undefined) {
                    message.chatId = emptyTab._id
                } else {
                    message.chatId = states.chosenTab._id
                }
                socket.send(JSON.stringify(message))
                socketOnMessage(socket, dispatch)
                localDispatch({type: 'anchorElEvent', payload: null})
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleMenu = useCallback((event) => {
        localDispatch({type: 'anchorElEvent', payload: event.currentTarget})
      }, [states.anchorEl])
  
    const handleClose = useCallback(() => {
        localDispatch({type: 'anchorElEvent', payload: null})
    }, [states.anchorEl])

    return (
        <div>
            {filterChats.map(chat => 
                <TabPanel key={chat._id} value={states.value} index={chatsStore.indexOf(chat)}>
                    <div className = {styles.container}>
                        <div className = {styles.content}>
                            <Tooltip title={t ('description.NavBarMenuTooltip')} arrow>
                                <IconButton
                                    aria-haspopup='true'
                                    onClick={handleMenu}
                                    color='inherit'
                                >
                                    <AvatarComp 
                                        chat={chat}
                                    />
                                </IconButton>
                            </Tooltip>
                            <MenuComp 
                                deleteChat={deleteChat}
                                setAvatar={setAvatar}
                                handleClose={handleClose}
                            />
                            <div>{chat.usernames.find(username => username !== userStore.username)}</div>
                            {avatar && (
                                <ModalComp 
                                    chat={chat}
                                    avatar={avatar}
                                    setAvatar={setAvatar}
                                    handleClose={handleClose}
                                />
                            )}
                        </div>
                    </div>
                </TabPanel>
            )}
        </div>
    )
}

export default ChatTitle
