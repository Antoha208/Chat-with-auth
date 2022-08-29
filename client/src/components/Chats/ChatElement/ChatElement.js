import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Tooltip from '@material-ui/core/Tooltip'


import useStyles from './makeStyles'
import styles from './ChatElement.module.css'
import { Context } from '../context'

const ChatElement = () => {
    const { tabProps, handleChangeTab, value, filterChats } = useContext(Context)
    const { t } = useTranslation()
    const classes = useStyles()
    const userStore = useSelector(state => state.user.user)
    const chatsStore = useSelector(state => state.chats.chats)

    return (
        <div>
            <div className={classes.rootTabs}>
                <Tabs
                    orientation="vertical"
                    indicatorColor="primary"
                    variant="scrollable"
                    value={value}
                    onChange={handleChangeTab}
                    className={classes.tabs}
                >
                    {filterChats.map(chat =>
                        <Tooltip 
                            title={t ('description.AdminUsersCheckBoxTooltip')} arrow
                            key={chat._id}
                        >
                            <Tab
                                label={
                                    <div className = {styles.container}>
                                        <div className = {styles.content}>    
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={ chat.avatars !== [] || undefined || null ?
                                                        `${process.env.REACT_APP_URL_API + chat.avatars.find((el, index) => index !== 0)}`
                                                    :
                                                        ''
                                                    }
                                                />
                                            </ListItemAvatar>
                                            <ListItemText>{chat.usernames.find(username => username !== userStore.username)}</ListItemText>
                                        </div>
                                    </div>
                                } 
                                {...tabProps(chatsStore.indexOf(chat))} 
                            >
                            </Tab>    
                        </Tooltip>
                    )}
                </Tabs>
            </div> 
        </div>
    )
}

export default ChatElement