import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'


import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';


import useStyles from './makeStyles'
import styles from './ChatList.module.css'
import { Context } from '../context'
import { setAllUsers } from '../../../store/usersListReducer'
import { resetAllChats, setChat, setArrayChats, resetChat } from '../../../store/chatsReducer'
import { setCompanion } from '../../../store/companionReducer'
import { setArrayMessages, resetAllMessages } from '../../../store/messagesReducer'
import { getUsers, getOneUser } from '../../../http/userApi'
import { getChats, deleteAllChats } from '../../../http/chatsApi'
import { getMessages } from '../../../http/messagesApi'
import SelectCompanion from '../SelectCompanion/SelectCompanion'
import ChatTitle from '../ChatTitle/ChatTitle'
import ChatElement from '../ChatElement/ChatElement'
import CHATS from './img/chats.png'


const ChatList = ({chats, setChats, showRequest, setShowRequest, showDelRequest, setShowDelRequest}) => {
    const dispatch = useDispatch()
    const userStore = useSelector(state => state.user.user)
    const compStore = useSelector(state => state.companion.companion)
    const allUsers = useSelector(state => state.users.users)
    const chatsStore = useSelector(state => state.chats.chats)
    const messagesStore = useSelector(state => state.messages.messages)
    const { t } = useTranslation()
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const [search, setSearch] = useState('')
    const [plus, setPlus] = useState(false)
    const [chosenTab, setChosenTab] = useState({})
    const [haveChat, setHaveChat] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const open = Boolean(anchorEl)


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
    }, [chats])

    const addChatWith = async () => {
      try {
        let users;
          users = await getUsers()
          const apartMe = users.filter(el => el.username !== userStore.username)
          const usersDB = apartMe.map(user => user.username)
          const storeUsers = allUsers.map(user => user.username)
          const matchUsers = storeUsers.some(user => usersDB.includes(user))
  
          if (matchUsers) {
            setPlus(true)
          } else {
            dispatch(setAllUsers(apartMe))
            setPlus(true)
          }
      } catch (error) {
        alert(error)
      }
    }

    const deleteAll = async () => {
      try {
        // if (messagesStore.some(el => el.event === 'disconnect' && el.username === compStore.username)) { // слишком могущественная кнопка. Условие удаления надо повесомее
        //   alert(`${t ('description.ChatListDeleteAll')}`)
        // } else {
          await deleteAllChats(userStore.id)

          dispatch(resetAllMessages())
          dispatch(resetAllChats())
          setAnchorEl(null)
          setChats([])
        // }
      } catch (error) {
        alert(error)
      }
    }

    const closeBar = () => {
      if (plus) {
        setPlus(false)
      } else if (open) {
        setAnchorEl(null)
      }      
    }

    const filterChats = chatsStore.filter(chat => {
      return chat.usernames.find(el => el !== userStore.username).toLowerCase().includes(search.toLowerCase())
    })

    const handleChangeTab = async (event, newValue) => {
      setValue(newValue)
      const tab = filterChats.find((el, index) => index === newValue)
      setChosenTab(tab)
      
      const findChat = chatsStore.find(el => el.usernames.includes(event.target.innerHTML))
      
      await getOneUser(findChat.ids.find(el => el !== userStore.id)).then(data => 
        dispatch(setCompanion(
          data._id,
          data.username,
          data.roles, 
          data.iat, 
          data.exp, 
          data.avatar, 
          data.about,
          data.registrationDate
        ))
      )
      dispatch(resetAllMessages())
      
      await getMessages(findChat._id).then(data =>
        dispatch(setArrayMessages(data))
      )
    }

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div>
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
        </div>
      )
    }

    function tabProps(index) {
      return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
      }
    }

  return (
      <Context.Provider value = {{
        closeBar, TabPanel, tabProps, handleChangeTab, setAnchorEl, setChosenTab,
        value, anchorEl,  filterChats, open, chosenTab,  
      }}
      >
        <div className = { classes.sideBar }>
          <Toolbar className = {classes.toolbar}>
            <ChatTitle />
          </Toolbar>  
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder={t ('description.ChatListSearch')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton disabled className={classes.iconButton}>
              <SearchIcon className={styles.icon__disabled} />
            </IconButton>
            {!menuOpen ?
              <Tooltip title={t ('description.NavBarMenuTooltip')} arrow>
                <IconButton className={classes.iconButton} onMouseEnter={() => setMenuOpen(true)}>
                  <MenuOpenRoundedIcon className={styles.icon} />
                </IconButton>
              </Tooltip>
            :
              <div onMouseLeave={() => setMenuOpen(false)}>
                {chatsStore.length !== 0 && (
                  <Tooltip title={t ('description.ChatListDeleteAllTooltip')} arrow>
                    <IconButton className={classes.iconButton} onClick={deleteAll} >
                      <RemoveCircleOutlineRoundedIcon className={styles.icon} />
                    </IconButton>
                  </Tooltip>
                )}
                {!plus ?
                  <Tooltip title={t ('description.ChatListAddTooltip')} arrow>
                    <IconButton className={classes.iconButton} onClick={addChatWith}>
                      <AddRoundedIcon className={styles.icon} />
                    </IconButton>
                  </Tooltip>
                :
                  <Tooltip title={t ('description.ChatListCloseTooltip')} arrow>
                    <IconButton className={classes.iconButton} onClick={closeBar}>
                      <ClearRoundedIcon className={styles.icon} />
                    </IconButton>
                  </Tooltip>
                }
              </div>
            }
            <Divider className={classes.divider} orientation="vertical" />
          </Paper>
          {plus ?
            <SelectCompanion 
              chats={chats} 
              setChats={setChats} 
              showRequest={showRequest} 
              setShowRequest={setShowRequest} 
            />
          :
            chatsStore.length === 0 ?
              <div className = {styles.chats__wrapper}>
                <img 
                  className = {styles.chats} 
                  src = {CHATS}
                />
                <div className={styles.chats__text}>{t ('description.ChatListEmpty')}</div>
              </div>
            :
              <ChatElement />
          } 
        </div>
      </Context.Provider>
    )

}

export default ChatList