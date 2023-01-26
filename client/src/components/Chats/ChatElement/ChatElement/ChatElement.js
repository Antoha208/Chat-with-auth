import React, { useContext } from 'react'
import { useSelector } from 'react-redux'


import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import ListItemText from '@mui/material/ListItemText'


import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'
import styles from './ChatElement.module.css'
import AvatarComp from '../AvatarComp/AvatarComp.js'
import { Context } from '../../context.js'

const ChatElement = () => {
    const { tabProps, handleChangeTab, states, filterChats } = useContext(Context)
    const classes = useClasses(stylesJS)
    const compStore = useSelector(state => state.companion.companion)
    const userStore = useSelector(state => state.user.user)
    const chatsStore = useSelector(state => state.chats.chats)

    return (
        <div className={classes.rootTabs}>
            <Tabs
                orientation="vertical"
                indicatorColor="primary"
                variant="scrollable"
                value={states.value}
                onChange={handleChangeTab}
                className={classes.tabs}
            >
                {filterChats.map(chat =>
                    <Tab
                        key={chat._id}
                        disabled={chat.usernames.includes(compStore.username)}
                        label={
                            <div className = {styles.container}>
                                <div className = {styles.content}>    
                                    <AvatarComp
                                        chat={chat}
                                    />
                                    <ListItemText>{chat.usernames.find(username => username !== userStore.username)}</ListItemText>
                                </div>
                            </div>
                        } 
                        {...tabProps(chatsStore.indexOf(chat))}
                    />
                )}
            </Tabs>
        </div> 
    )
}

export default ChatElement
