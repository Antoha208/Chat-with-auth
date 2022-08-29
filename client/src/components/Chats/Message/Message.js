import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'


import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'


import styles from './Message.module.css'
import { updateMessage, removeMessage } from '../../../store/messagesReducer'
import MessageConnection from './MessageConnection/MessageConnection'
import MessageRequest from './MessageRequest/MessageRequest'
import MessageStartTexting from './MessageStartTexting/MessageStartTexting'
import MessageDeletingChat from './MessageDeletingChat/MessageDeletingChat'
import MessageDisconnect from './MessageDisconnect/MessageDisconnect'
import MessageFromUser from './MessageRegular/MessageFromUser'
import MessageFromComp from './MessageRegular/MessageFromComp'


const Message = ({connected, connect, showRequest, showDelRequest, applyToRequest, deletingChat}) => {
    const userStore = useSelector(state => state.user.user)
    const compStore = useSelector(state => state.companion.companion)
    const messagesStore = useSelector(state => state.messages.messages)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [data, setData] = useState(false)
    const [zoom, setZoom] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openMenu, setOpenMenu] = useState(false)
    const [findClicked, setFindClicked] = useState({})
    const [newText, setNewText] = useState('')
    const [updatedMess, setUpdatedMess] = useState({})

    useEffect(() => {
        //console.log(messages)
        if (!connected) {
            connect()
        }
      }, [data])

    if (compStore.id === !null) {
        setData(!data)
    }

    function messMenu (e) {
        const messKey = Object.entries(e.target)[0][1].key

        if (messagesStore.some(el => el.key == messKey && el.event === 'message' && el.username === userStore.username)) {
            setFindClicked(messKey)

            if (!openMenu) {
                setOpenMenu(true)
                setAnchorEl(e.currentTarget)
            } else {
                setOpenMenu(false)
                setAnchorEl(null)
            }
        }
      }

    function deleteMessage () {
        const message = messagesStore.find(el => el.key == findClicked)
        dispatch(removeMessage(message))
        setOpenMenu(false)
    }

    function editMessage (e) {
        const message = messagesStore.find(el => el.key == findClicked)
        message.isUpdate = true

        setNewText(e.target.value)
        
        const newMess = {
            event: 'message',
            username: userStore.username,
            key: message.key,
            message: newText,
            attachment: message.attachment,
            avatar: compStore.avatar,
            id: userStore.id,
            chatId: compStore.id,
            isUpdate: false,
            updatedAt: Date.now()  
        }
        setUpdatedMess(newMess)
        setOpenMenu(false)
    }

    function acceptMessage (mess) {
        mess.isUpdate = false
        dispatch(updateMessage(updatedMess))
        setUpdatedMess({})
    }

    return (
        <div>
            {messagesStore.map(mess => 
                <div className = {styles.message} key={mess.key} onClick={messMenu}>
                    {openMenu && (
                        <Tooltip title={t ('description.NavBarMenuTooltip')} arrow>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={() => setOpenMenu(false)}
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
                            // showRequest && (
                                <MessageRequest mess={mess} applyToRequest={applyToRequest} />
                            // )
                        :
                            mess.event === 'disconnect' ?
                                <MessageDisconnect mess={mess} />
                            :
                                mess.event === 'deleteChat' ?
                                    <MessageDeletingChat mess={mess} deletingChat={deletingChat} />
                                :   
                                    <div className = {mess.username === userStore.username ? styles.message__left : styles.message__right}>
                                        <div key={mess.key} className = {styles.container}>
                                            {mess.username === userStore.username ?
                                                <MessageFromUser 
                                                    mess={mess} 
                                                    editMessage={editMessage} 
                                                    acceptMessage={acceptMessage}
                                                    zoom={zoom}
                                                    setZoom={setZoom}
                                                    newText={newText}    
                                                />
                                            :
                                                <MessageFromComp 
                                                    mess={mess}
                                                    zoom={zoom}
                                                    setZoom={setZoom}
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