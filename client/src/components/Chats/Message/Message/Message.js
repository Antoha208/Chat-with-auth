import React, { useCallback, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'


import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'


import styles from './Message.module.css'
import { getWebSocket } from '../../../../WebSocket/webSocket'
import { modelMessage } from '../../../../WebSocket/Models'
import { updateMessage, removeMessage } from '../../../../store/messagesReducer'
import localReducer from './localReducer'
import MessageConnection from '../MessageConnection/MessageConnection'
import MessageRequest from '../MessageRequest/MessageRequest'
import MessageDeletingChat from '../MessageDeletingChat/MessageDeletingChat'
import MessageDisconnect from '../MessageDisconnect/MessageDisconnect'
import MessageFromUser from '../MessageRegular/MessageFromUser'
import MessageFromComp from '../MessageRegular/MessageFromComp'


const Message = ({applyToRequest, deletingChat}) => {
    const userStore = useSelector(state => state.user.user)
    const compStore = useSelector(state => state.companion.companion)
    const messagesStore = useSelector(state => state.messages.messages)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [states, localDispatch] = useReducer(localReducer, {zoom: false, anchorEl: null, openMenu: false, findClicked: '', newText: '', updatedMess: {}, deletedMess: {}})

    function messMenu (e) {
        const messKey = Object.entries(e.target)[0][1].key

        if (messagesStore.some(el => el.key == messKey && el.event === 'message' && el.username === userStore.username)) {
            localDispatch({type: 'findClicked', payload: messKey})
            const message = messagesStore.find(el => el.key == messKey) 

            if (!states.openMenu && !message.isUpdating) {
                localDispatch({type: 'openMenu'})
                localDispatch({type: 'anchorEl', payload: e.currentTarget})
            } else {
                localDispatch({type: '!openMenu'})
                localDispatch({type: 'anchorEl', payload: null})
            }
        }
      }

    function deleteMessage () {
        const message = messagesStore.find(el => el.key == states.findClicked)
        message.isUpdating = true
        message.delete = true
        localDispatch({type: 'deletedMess', payload: message})
        localDispatch({type: '!openMenu'})
    }

    const editMessage = useCallback((e) => {
        const message = messagesStore.find(el => el.key == states.findClicked)
        message.isUpdating = true
        localDispatch({type: 'newText', payload: e.target.value})
        const newMess = modelMessage('edit', userStore, compStore, e.target.value, undefined, states.findClicked)
        if (message.attachment !== '') {
            newMess.attachment = message.attachment
        }
        localDispatch({type: 'updatedMess', payload: newMess})
        localDispatch({type: '!openMenu'})
    }, [states.anchorEl])

    const acceptMessage = useCallback((mess) => {
        mess.isUpdating = false
        mess.isUpdated = true
        let socket = getWebSocket()
        if (mess.delete) {
            dispatch(removeMessage(states.deletedMess))
            const message = states.deletedMess
            message.event = 'deleteMess'
            socket.send(JSON.stringify(message))
        } else {
            if (states.updatedMess.message !== undefined) {
                dispatch(updateMessage(states.updatedMess))
                const message = states.updatedMess
                message.isUpdating = false
                socket.send(JSON.stringify(message))
            } else {
                alert(`${t ('description.MessageEditing')}`)
            }
        }
        localDispatch({type: 'updatedMess', payload: {}})
        localDispatch({type: 'deletedMess', payload: {}})
    }, [states.updatedMess, states.deletedMess])

    return (
        <div>
            {messagesStore.map(mess => 
                <div className = {styles.message} key={mess.key} onClick={messMenu}>
                    {states.openMenu && (
                        <Tooltip title={t ('description.NavBarMenuTooltip')} arrow>
                            <Menu
                                anchorEl={states.anchorEl}
                                open={states.openMenu}
                                onClose={() => localDispatch({type: '!openMenu'})}
                            >
                                <Tooltip title={t ('description.MessageEditTooltip')} arrow>
                                    <MenuItem onClick={editMessage}><EditRoundedIcon className={styles.icon} /></MenuItem>
                                </Tooltip>
                                <Tooltip title={t ('description.MessageDeleteTooltip')} arrow>
                                    <MenuItem onClick={deleteMessage}><DeleteForeverRoundedIcon className={styles.icon} /></MenuItem>
                                </Tooltip>
                            </Menu>
                        </Tooltip>
                    )}                    
                    {mess.event === 'connection' ?
                        <MessageConnection mess={mess} />
                    :
                        mess.event === 'request' ?
                            <MessageRequest mess={mess} applyToRequest={applyToRequest} />
                        :
                            mess.event === 'disconnect' ?
                                <MessageDisconnect mess={mess} />
                            :
                                mess.event === 'deleteChat' ?
                                    <MessageDeletingChat mess={mess} deletingChat={deletingChat} />
                                :   
                                    <div 
                                        className = {
                                                        mess.username === userStore.username ? 
                                                            mess.isUpdating ? 
                                                                styles.message__leftDefault 
                                                            : 
                                                                styles.message__left 
                                                    : 
                                                        styles.message__right
                                                    }>
                                        <div key={mess.key} className = {styles.container}>
                                            {mess.username === userStore.username ?
                                                <MessageFromUser 
                                                    mess={mess}
                                                    editMessage={editMessage} 
                                                    acceptMessage={acceptMessage}
                                                    localDispatch={localDispatch}
                                                    states={states}    
                                                />
                                            :
                                                <MessageFromComp 
                                                    mess={mess}
                                                    states={states}
                                                    localDispatch={localDispatch}
                                                />
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