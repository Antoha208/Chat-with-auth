import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import styles from './SelectCompanion.module.css'
import useStyles from './SelectCompanionMakeStyles'
// import ChatElement from '../ChatElement/ChatElement'
import { Context } from '../context'
import { setCompanion } from "../../../store/companionReducer";
import { setAllUsers } from '../../../store/usersListReducer';


const SelectCompanion = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  // const userStore = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.users.users)
  // const selectedUser = useSelector(state => state.companion.companion)
  // const [checked, setChecked] = useState([1])
  const {closeBar} = useContext(Context)
  const [search, setSearch] = useState('')
  // const navigate = useNavigate()

  const filterUsers = allUsers.filter(user => {
    return user.username.toLowerCase().includes(search.toLowerCase())
  })

  function createChat(event) {
    const chosen = allUsers.find(user => {
      return user.username === event.target.innerHTML
    })
    // проверяем уникален ли выбранный пользователь (есть ли с ним уже чат или нет). Если еще нет, то добавляем
    // выбранного пользователя в массив всех чатов(юзеров), а также в стор. В массив необязательно добавлять, главное в стор
    const checkUsers = allUsers.every(user => user.username !== chosen.username)
    // добавляем в стор выбранного пользователя, с которым создаем чат (тянем его в чатЭлемент для подгрузки данных)
    console.log(checkUsers)
    if (!checkUsers) {
      //allUsers.push(chosen)
      dispatch(setCompanion(chosen._id, chosen.username, chosen.roles, chosen.iat, chosen.exp, chosen.avatar, chosen.about))
      dispatch(setAllUsers(chosen))
      console.log('element added')
    } else {
      console.log('chat has already been created')
    }

    closeBar()
  }

  return (
    <List dense className={classes.root}>
      <Paper component="form" className={classes.inputWrap}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled className={classes.iconButton}>
          <SearchIcon />
        </IconButton>
      </Paper>
        {filterUsers.map((user, index) => {
          return (
            <ListItem className={classes.listItem} key={index} style={{alignItems: 'flex-start'}}>
              <Button onClick={createChat}>
                <div className = {styles.user__basicInfo}>
                  <ListItemAvatar>
                    <Avatar
                      src={ user.avatar !== '' ?
                        `${process.env.REACT_APP_URL_API + user.avatar}`
                      :
                        ''
                      }
                    />
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