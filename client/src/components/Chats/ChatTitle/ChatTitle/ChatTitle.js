import React, { useState, useContext, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'


import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'


import styles from './ChatTitle.module.css'
import AvatarComp from '../AvatarComp/AvatarComp'
import ModalComp from '../ModalComp/ModalComp'
import MenuComp from '../MenuComp/MenuComp'
import { Context } from '../../context'
import { getWebSocket, socketOnMessage } from '../../../../WebSocket/webSocket'
import { modelMessage } from '../../../../WebSocket/Models'


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