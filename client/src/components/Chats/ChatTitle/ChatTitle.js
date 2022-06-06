import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import Modal from '@material-ui/core/Modal'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded'
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded'


import styles from './ChatTitle.module.css'
import useStyles from './makeStyles'
import { Context } from '../context'
import { resetChat } from '../../../store/chatsReducer'
import { deleteOneChat } from '../../../http/chatsApi'

const ChatTitle = () => {
    const { TabPanel, closeBar, filterChats, open, anchorEl, setAnchorEl, chosenTab, value } = useContext(Context)
    const classes = useStyles()
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState(false)
    const userStore = useSelector(state => state.user.user)
    const chatsStore = useSelector(state => state.chats.chats)

    const deleteChat = async () => {
        try {
            await deleteOneChat(userStore.id, chosenTab._id)

            dispatch(resetChat(chosenTab))
            setAnchorEl(null)
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

    const addComp = () => {
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
                                <MenuItem onClick={zoomAvatar}><ZoomInRoundedIcon className={styles.icon} /></MenuItem>
                                <MenuItem onClick={deleteChat}><DeleteForeverRoundedIcon className={styles.icon} /></MenuItem>
                                <MenuItem /*onClick={addComp}*/><PersonAddRoundedIcon className={styles.icon} /></MenuItem>
                                <MenuItem onClick={closeBar}><ClearRoundedIcon className={styles.icon} /></MenuItem>
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