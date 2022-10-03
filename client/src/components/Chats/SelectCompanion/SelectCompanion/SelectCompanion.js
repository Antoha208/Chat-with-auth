import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'


import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'


import styles from './SelectCompanion.module.css'
import useStyles from './makeStyles'
import ListElement from '../ListElement/ListElement'
import { ContextMain } from '../../../../pages/Chats/contextMain'
import { Context } from '../../context'
import { setChatId, setCompanion } from '../../../../store/companionReducer'
import { setChat } from '../../../../store/chatsReducer'
import { createNewChat } from '../../../../http/chatsApi'

const SelectCompanion = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
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
          <SearchIcon className={styles.icon} />
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