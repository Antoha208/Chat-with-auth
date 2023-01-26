import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'


import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'


import styles from './SelectCompanion.module.css'
import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'
import ListElement from '../ListElement/ListElement.js'
import { ContextMain } from '../../../../pages/Chats/contextMain.js'
import { Context } from '../../context.js'
import { setChatId, setCompanion } from '../../../../store/companionReducer.js'
import { setChat } from '../../../../store/chatsReducer.js'
import { createNewChat } from '../../../../http/chatsApi.js'

const SelectCompanion = () => {
  const dispatch = useDispatch()
  const classes = useClasses(stylesJS)
  const { t } = useTranslation()
  const userStore = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.users.users)
  const chatsStore = useSelector(state => state.chats.chats)
  const { setChats } = useContext(ContextMain)
  const { closeBar, handleChangeTab } = useContext(Context)
  const [search, setSearch] = useState('')

  const filterUsers = allUsers.filter(user => {
    return user.username.toLowerCase().includes(search.toLowerCase())
  })
  const chatsIds = chatsStore.map(el => el.ids)
  
  const createChat = async (event) => {
    const chosen = filterUsers.find(user => {
      return user.username === event.target.innerText
    })

    const ids = [userStore.id, chosen._id]
    const checkChats = chatsIds.some(el => JSON.stringify(el.sort()) === JSON.stringify(ids.sort())) 
    if (!checkChats) {    
      const usernames = [userStore.username, chosen.username]
      const avatars = [userStore.avatar, chosen.avatar]
      if (chosen.iat !== 0) {
        const newChat = await createNewChat(userStore.id, ids, usernames, avatars)
        if (newChat !== 'This chat has already been created back') {   
          setChats(chats => [...chats, newChat])
          dispatch(setCompanion(chosen))
          dispatch(setChatId(newChat._id))
          dispatch(setChat(newChat))
        }
      } else {
        alert(`${t ('description.SelectCompanionAlert1')}`)
      }
    } else {
      alert(`${t ('description.SelectCompanionAlert2')}`)
      dispatch(setCompanion(chosen))
      const existingChat = chatsStore.find(el => el.usernames.includes(chosen.username))
      dispatch(setChatId(existingChat._id))
      handleChangeTab('', chatsStore.indexOf(existingChat))
    }
    closeBar()
  }

  return (
    <List dense className={classes.root}>
      <Paper component="form" className={classes.inputWrap}>
        <InputBase
          className={classes.input}
          placeholder={t ('description.SelectCompanionSearch')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled className={classes.iconButton}>
          <SearchRoundedIcon className={styles.icon} />
        </IconButton>
      </Paper>
        {filterUsers.map((user, index) => {
          return (
            <Button className={classes.button} onClick={createChat} key={index}>
              <ListElement 
                user={user}
              />
            </Button>
          )
        })}
    </List>
  )
}

export default SelectCompanion
