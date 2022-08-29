import React, { useState, useContext, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'


import Modal from '@material-ui/core/Modal'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded'


import styles from './ChatTitle.module.css'
import useStyles from './makeStyles'
import { Context } from '../context'
// import { resetChat } from '../../../store/chatsReducer'
import { setMessage, resetAllMessages } from '../../../store/messagesReducer'
// import { deleteOneChat } from '../../../http/chatsApi'
// import { deleteAllMessages, deleteAllMessagesFromChat } from '../../../http/messagesApi'

const ChatTitle = () => {
    const { TabPanel, closeBar, filterChats, open, anchorEl, setAnchorEl, chosenTab, value } = useContext(Context)
    const classes = useStyles()
    const userStore = useSelector(state => state.user.user)
    const compStore = useSelector(state => state.companion.companion)
    const chatsStore = useSelector(state => state.chats.chats)
    const messagesStore = useSelector(state => state.messages.messages)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const socket = useRef()
    const [avatar, setAvatar] = useState(false)

    const deleteChat = async () => {
        try {
            if (messagesStore.some(el => el.event === 'disconnect')) {
                alert(`${t ('description.ChatTitleDeleteChat')}`)
            } else {
                socket.current = new WebSocket('ws://localhost:4000')
                const emptyTab = chatsStore.find((el, index)=> index === 0)
                socket.current.onopen = () => {
                    const message = {
                      event: 'deleteChat',
                      username: userStore.username,
                      key: Date.now(),
                      id: userStore.id,
                      compId: compStore.id,
                      chatId: chosenTab._id || emptyTab._id
                    }
                    socket.current.send(JSON.stringify(message))
                    socket.current.onmessage = (event) => {
                        const message = JSON.parse(event.data)
                        // console.log(message)
                        // const filter = messagesStore.some(mess => mess.key === message.key)
                        if (message.event === 'deleteChat' && message.answer === undefined) {
                            dispatch(setMessage(message))
                        }
                    }
                }
                setAnchorEl(null)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
      }
  
    const handleClose = () => {
        setAnchorEl(null)
    }

    const zoomAvatar = () => {
        setAvatar(true)
    }

    const unzoomAvatar = () => {
        setAvatar(false)
    }
  
    return (
        <div>
            {filterChats.map(chat => 
                <TabPanel key={chat._id} value={value} index={chatsStore.indexOf(chat)}>
                    <div className = {styles.container}>
                        <div className = {styles.content}>
                            <Tooltip title={t ('description.NavBarMenuTooltip')} arrow>
                                <IconButton
                                    aria-haspopup='true'
                                    onClick={handleMenu}
                                    color='inherit'
                                >
                                    <Avatar
                                        src={ chat.avatars !== [] || undefined || null ?
                                            `${process.env.REACT_APP_URL_API + chat.avatars.find((el, index) => index !== 0)}`
                                        :
                                            ''
                                        }
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <Tooltip title={t ('description.ChatTitleZoomTooltip')} arrow>
                                    <MenuItem onClick={zoomAvatar}><ZoomInRoundedIcon className={styles.icon} /></MenuItem>
                                </Tooltip>
                                <Tooltip title={t ('description.ChatTitleZoomTooltip')} arrow>
                                    <MenuItem onClick={deleteChat}><DeleteForeverRoundedIcon className={styles.icon} /></MenuItem>
                                </Tooltip>
                                <Tooltip title={t ('description.ChatListCloseTooltip')} arrow>
                                    <MenuItem onClick={closeBar}><ClearRoundedIcon className={styles.icon} /></MenuItem>
                                </Tooltip>
                            </Menu>
                            <div>{chat.usernames.find(username => username !== userStore.username)}</div>
                            {avatar ?
                                <Modal
                                    open={avatar}
                                    onClose={unzoomAvatar}
                                >
                                    <Avatar className={classes.paper}
                                        src={ chat.avatars !== [] || undefined || null ?
                                            `${process.env.REACT_APP_URL_API + chat.avatars.find((el, index) => index !== 0)}`
                                        :
                                            ''
                                        }
                                    />
                                </Modal>
                            :
                                ''
                            }
                        </div>
                    </div>
                </TabPanel>
            )}
        </div>
    )
}

export default ChatTitle