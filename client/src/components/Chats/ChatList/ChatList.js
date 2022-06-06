import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'


import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'


import useStyles from './makeStyles'
import styles from './ChatList.module.css'
import { getUsers } from '../../../http/userApi'
import { setAllUsers } from '../../../store/usersListReducer'
import { resetAllChats, setAllChats } from '../../../store/chatsReducer'
import SelectCompanion from '../SelectCompanion/SelectCompanion'
import ChatTitle from '../ChatTitle/ChatTitle'
import ChatElement from '../ChatElement/ChatElement'
import { Context } from '../context'
import { getChats, deleteAllChats } from '../../../http/chatsApi'


const ChatList = () => {
    const dispatch = useDispatch()
    const userStore = useSelector(state => state.user.user)
    const allUsers = useSelector(state => state.users.users)
    const chatsStore = useSelector(state => state.chats.chats)
    const { t } = useTranslation()
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const [search, setSearch] = useState('')
    const [plus, setPlus] = useState(false)
    const [chosenTab, setChosenTab] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    useEffect( () => {
      getChats(userStore.id).then(data => {
        const chatsDB = data.map(el=> el._id)
        const check = chatsStore.some(elem => chatsDB.includes(elem._id))
        if (!check) {
          dispatch(setAllChats(data))
        } else {
          console.log(data)
        }
      })
    }, [])

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
        await deleteAllChats(userStore.id)

        dispatch(resetAllChats())
        setAnchorEl(null)
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
    console.log(allUsers)
    const filterChats = chatsStore.filter(chat => {
      return chat.usernames.find(el => el !== userStore.username).toLowerCase().includes(search.toLowerCase())
    })
    console.log(filterChats)

    const handleChangeTab = (event, newValue) => {
      setValue(newValue)
      const tab = filterChats.find((el, index) => index === newValue)
      setChosenTab(tab)
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
            <IconButton className={classes.iconButton} onClick={deleteAll}>
              <RemoveCircleOutlineRoundedIcon className={styles.icon} />
            </IconButton>
            {!plus ?
              <IconButton className={classes.iconButton} onClick={addChatWith}>
                <AddRoundedIcon className={styles.icon} />
              </IconButton>
            :
              <IconButton className={classes.iconButton} onClick={closeBar}>
                <ClearRoundedIcon className={styles.icon} />
              </IconButton>
            }
            
            <Divider className={classes.divider} orientation="vertical" />
          </Paper>
          {plus ?
            <SelectCompanion />
          :
            <ChatElement />
          } 
        </div>
      </Context.Provider>
    )

}

export default ChatList