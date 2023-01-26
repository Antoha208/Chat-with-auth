import React, { useCallback, useEffect, useReducer, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'


import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'


import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'
import styles from './ChatList.module.css'
import { ContextMain } from '../../../../pages/Chats/contextMain.js'
import localReducer from './localReducer.js'
import { Context } from '../../context.js'
import { setAllUsers } from '../../../../store/usersListReducer.js'
import { resetAllChats, setArrayChats } from '../../../../store/chatsReducer.js'
import { setCompanion, setChatId } from '../../../../store/companionReducer.js'
import { setArrayMessages, resetAllMessages } from '../../../../store/messagesReducer.js'
import { getUsers, getOneUser } from '../../../../http/userApi.js'
import { getChats, deleteAllChats } from '../../../../http/chatsApi.js'
import { getMessages } from '../../../../http/messagesApi.js'
import { disconnect } from '../../../../WebSocket/webSocket.js'
import ShowingList from '../ShowingList/ShowingList.js'
import SelectCompanion from '../../SelectCompanion/SelectCompanion/SelectCompanion.js'
import ChatTitle from '../../ChatTitle/ChatTitle/ChatTitle.js'
import ChatElement from '../../ChatElement/ChatElement/ChatElement.js'
import EmptyList from '../EmptyList/EmptyList.js'


const ChatList = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userStore = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.users.users)
  const chatsStore = useSelector(state => state.chats.chats)
  const compStore = useSelector(state => state.companion.companion)
  const messagesStore = useSelector(state => state.messages.messages) 
  const classes = useClasses(stylesJS)
  const { chats, setChats, setConnected } = useContext(ContextMain)
  const [states, localDispatch] = useReducer(localReducer, {value: 0, chosenTab: {}, anchorEl: null, search: '', plus: false, menuOpen: false})
  const open = Boolean(states.anchorEl)

  useEffect( () => {
    getChats(userStore.id).then(data => {
      if (data.length !== 0) {
        const chatsDB = data.map(el => el._id)
        const check = chatsStore.some(elem => chatsDB.includes(elem._id))
        if (!check) {
          dispatch(setArrayChats(data))
        } 
      } 
    })
    if (chats.length > 1) {
      handleChangeTab('', chats.indexOf(chatsStore.at(-1)))
    }
  }, [chats])

  const addChatWith = useCallback( async () => {
    try {
      let users;
        users = await getUsers()
        const apartMe = users.filter(el => el.username !== userStore.username)
        const usersDB = apartMe.map(user => user.username)
        const storeUsers = allUsers.map(user => user.username)
        const matchUsers = storeUsers.some(user => usersDB.includes(user))

        if (matchUsers) {
          localDispatch({type: 'plus'})
        } else {
          dispatch(setAllUsers(apartMe))
          localDispatch({type: 'plus'})
        }
    } catch (error) {
      alert(error)
    }
  }, [states.plus]) 

  const deleteAll = useCallback( async () => {
    try {
      // if (messagesStore.some(el => el.event === 'disconnect' && el.username === compStore.username)) { // слишком могущественная кнопка. Условие удаления надо повесомее
      //   alert(`${t ('description.ChatListDeleteAll')}`)
      // } else {
        await deleteAllChats(userStore.id)

        dispatch(resetAllMessages())
        dispatch(resetAllChats())
        localDispatch({type: 'anchorElEvent', payload: null})
        setChats([])
      // }
    } catch (error) {
      alert(error)
    }
  }, [states.anchorEl])

  const closeBar = useCallback(() => {
    if (states.plus) {
      localDispatch({type: 'plus'})
    } else if (open) {
      localDispatch({type: 'anchorElEvent', payload: null})
    }      
  }, [states.plus])

  const filterChats = chatsStore.filter(chat => {
    return chat.usernames.find(el => el !== userStore.username).toLowerCase().includes(states.search.toLowerCase())
  })

  const handleChangeTab = useCallback(async (event, newValue) => {
    disconnect(dispatch, setConnected, userStore, compStore, messagesStore, t)
    localDispatch({type: 'value', payload: newValue})
    const tab = filterChats.find((el, index) => index === newValue)
    localDispatch({type: 'chosenTab', payload: tab})
    let findChat

    if (event !== '') {
      findChat = chatsStore.find(el => el.usernames.includes(event.target.innerText))
    } else {
      findChat = chatsStore.at(-1)
    }

    await getOneUser(findChat.ids.find(el => el !== userStore.id)).then(data => 
      dispatch(setCompanion(data))
    )
    dispatch(setChatId(findChat._id))
    dispatch(resetAllMessages())
    
    await getMessages(findChat._id).then(data =>
      dispatch(setArrayMessages(data))
    )
  }, [states.chosenTab, chats])

  const TabPanel = useCallback((props) => {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel" 
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2}>
            {children}
          </Box>
        )}
      </div>
    )
  }, [states.chosenTab])

  const tabProps = useCallback((index) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    }
  }, [states.chosenTab])

  return (
    <Context.Provider value = {{
      closeBar, TabPanel, tabProps, handleChangeTab, localDispatch,
      filterChats, open, states  
    }}
    >
      <div className = {classes.sideBar}>
        <Toolbar className = {classes.toolbar}>
          <ChatTitle />
        </Toolbar>
        <ShowingList 
          addChatWith={addChatWith}
          deleteAll={deleteAll}
        />  
        {states.plus ?
          <div className={styles.container}>
            <SelectCompanion />
          </div>
        :
          chatsStore.length === 0 ?
            <EmptyList />
          :
            <ChatElement />
        } 
      </div>
    </Context.Provider>
  )
}

export default ChatList
