import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'


import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import { Stack } from '@mui/material'
import Avatar from '@material-ui/core/Avatar'

import styles from './SelectCompanion.module.css'
import useStyles from './makeStyles'
import StyledBadge from '../../NavBar/AvatarComponent/withStyles'
import { Context } from '../context'
import { setCompanion } from '../../../store/companionReducer'
import { createNewChat } from '../../../http/chatsApi'
import { setChat } from '../../../store/chatsReducer'


const SelectCompanion = ({chats, setChats, setShowRequest}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { t } = useTranslation()
  const userStore = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.users.users)
  const chatsStore = useSelector(state => state.chats.chats)
  // const socket = useRef()
  const {closeBar} = useContext(Context)
  const [search, setSearch] = useState('')

  const filterUsers = allUsers.filter(user => {
    return user.username.toLowerCase().includes(search.toLowerCase())
  })

  const chatsIds = chatsStore.map(el => el.ids)
  
  const createChat = async (event) => {
    const chosen = filterUsers.find(user => {
      return user.username === event.target.innerHTML
    })

    const ids = [userStore.id, chosen._id]
    const checkChats = chatsIds.some(el => JSON.stringify(el.sort()) === JSON.stringify(ids.sort())) 
    if (!checkChats) {    
      const usernames = [userStore.username, chosen.username]
      const avatars = [userStore.avatar, chosen.avatar]

      if (chosen.iat !== 0) {
        const newChat = await createNewChat(userStore.id, ids, usernames, avatars)

        if (typeof newChat === !Object) {
          if (newChat.includes('This chat has already been created back')) {
            console.log(newChat)
          }
        } else {      
          setChats(prev => [...prev, newChat])
          dispatch(setCompanion(
            chosen._id,
            chosen.username,
            chosen.roles, 
            chosen.iat, 
            chosen.exp, 
            chosen.avatar, 
            chosen.about,
            chosen.registrationDate
          ))
          console.log('element added')
        }
      } else {
        alert(`${t ('description.SelectCompanionAlert1')}`)
      }
    } else {
      alert(`${t ('description.SelectCompanionAlert2')}`)
      dispatch(setCompanion(
        chosen._id,
        chosen.username,
        chosen.roles, 
        chosen.iat, 
        chosen.exp, 
        chosen.avatar, 
        chosen.about,
        chosen.registrationDate
      ))
    }

    // socket.current = new WebSocket('ws://localhost:4000')
    //   socket.current.onopen = () => {
    //     const message = {
    //       event: 'request',
    //       key: Date.now(),
    //       message: 'hello',
    //       id: userStore.id,
    //       username: userStore.username,
    //       avatar: userStore.avatar, 
    //       // chatId: newChat._id,
    //       compId: chosen._id
    //     }
    //       socket.current.send(JSON.stringify(message))
    //   }
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
            <ListItem className={classes.listItem} key={index} style={{alignItems: 'flex-start'}}>
              <Tooltip title={t ('description.AdminUsersCheckBoxTooltip')} arrow>
                <Button onClick={createChat}>
                  <div className = {styles.user__basicInfo}>
                    <ListItemAvatar>
                      {user.iat === 0 ?
                        <Avatar
                          src={ user.avatar !== '' ?
                            `${process.env.REACT_APP_URL_API + user.avatar}`
                          :
                            ''
                          }
                        />
                      :
                        <Stack direction="row" spacing={2}>        
                          <StyledBadge
                              overlap="circular"
                              anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                              }}
                              variant="dot"
                          >
                            <Avatar
                              src={ user.avatar !== '' ?
                                `${process.env.REACT_APP_URL_API + user.avatar}`
                              :
                                ''
                              }
                            />
                          </StyledBadge>
                        </Stack>
                      }
                    </ListItemAvatar>
                    <ListItemText>{user.username}</ListItemText>
                  </div>
                </Button>
              </Tooltip>
            </ListItem>
          );
        })}
    </List>
  );
}

export default SelectCompanion