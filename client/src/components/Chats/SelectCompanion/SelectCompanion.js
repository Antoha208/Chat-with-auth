import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'


import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import { Stack } from '@mui/material'
import Avatar from '@material-ui/core/Avatar'

import styles from './SelectCompanion.module.css'
import useStyles from './makeStyles'
import StyledBadge from '../../NavBar/AvatarComponent/withStyles'
// import ChatElement from '../ChatElement/ChatElement'
import { Context } from '../context'
import { setCompanion } from '../../../store/companionReducer'
import { createNewChat } from '../../../http/chatsApi'
import { resetAllChats, setAllChats } from '../../../store/chatsReducer'


const SelectCompanion = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const { t } = useTranslation()
  const userStore = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.users.users)
  const chatsStore = useSelector(state => state.chats.chats)
  // const selectedUser = useSelector(state => state.companion.companion)
  // const [checked, setChecked] = useState([1])
  const {closeBar} = useContext(Context)
  const [search, setSearch] = useState('')
  // const navigate = useNavigate()

  const filterUsers = allUsers.filter(user => {
    return user.username.toLowerCase().includes(search.toLowerCase())
  })

  const chatsIds = chatsStore.map(el => el.ids) 

  const createChat = async (event) => {
    const chosen = filterUsers.find(user => {
      return user.username === event.target.innerHTML
    })
    console.log(chosen)
    // проверяем уникален ли выбранный пользователь (есть ли с ним уже чат или нет). Если еще нет, то добавляем
    // выбранного пользователя в массив всех чатов(юзеров), а также в стор. В массив необязательно добавлять, главное в стор
    const checkChats = chatsIds.some(id => id.includes(chosen._id))
    // // добавляем в стор выбранного пользователя, с которым создаем чат (тянем его в чатЭлемент для подгрузки данных)
    console.log(checkChats)
    if (!checkChats) {
      const ids = [userStore.id, chosen._id]
      const usernames = [userStore.username, chosen.username]
      const avatars = [userStore.avatar, chosen.avatar]
      const newChat = await createNewChat(userStore.id, ids, usernames, avatars)
      console.log(newChat)
      dispatch(setAllChats(newChat))
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
    } else {
      console.log('chat has already been created')
    }

    closeBar()
  }

  console.log(filterUsers)

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
            </ListItem>
          );
        })}
    </List>
  );
}

export default SelectCompanion