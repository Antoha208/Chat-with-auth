import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment';


import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'


import useStyles from './makeStyles'
import styles from './UsersList.module.css'
import { REGISTRATION_ROUTE } from '../../../utils/consts'
import { deleteAllUsers, deleteOneUser } from '../../../http/userApi'

const UsersList = () => {
  const { t } = useTranslation()
  const classes = useStyles();
  const userStore = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.users.users)
  const [checked, setChecked] = useState([1])
  const [count, setCount] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filterUsers = allUsers.filter(user => {
    return user.username.toLowerCase().includes(search.toLowerCase())
  })
    
    
  const deleteAll = async () => {
    await deleteAllUsers()
    setChecked(true)
    navigate(REGISTRATION_ROUTE)
  }

  const choseeUser = (user) => () => {
    const currentIndex = checked.indexOf(user)
    const newChecked = [...checked]

    if (newChecked.length < 2) {

      if (currentIndex === -1) {
        newChecked.push(user)
      } else {
        newChecked.splice(currentIndex, 1)
      }

      if (count !== '') {
        setCount('')
      } else {
        setCount(newChecked[1].username)
      }

      setChecked(newChecked)
    } 

  }

  const deleteAccount = async () => {
    if (userStore.id === checked[1]._id) {
      await deleteOneUser(userStore.id)
      navigate(REGISTRATION_ROUTE)
    } else {
      await deleteOneUser(checked[1]._id)
    }
  } 
    
  return (
    <List dense className={classes.root}>
      <Paper component="form" className={classes.inputWrap}>
        <InputBase
          className={classes.input}
          placeholder={t ('description.AdminUsersSearch')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled className={classes.iconButton}>
          <SearchIcon className = {styles.icon} />
        </IconButton>
      </Paper>
        {filterUsers.map((user, index) => {
          return (
            <ListItem className={classes.listItem} key={index} style={{alignItems: 'flex-start'}}>
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
                  <ListItemSecondaryAction>
                  <Checkbox
                      onChange={choseeUser(user)}
                      checked={checked.indexOf(user) !== -1}
                  />
                  </ListItemSecondaryAction>
              </div>
              <div className = {styles.user__info}>
                <div>{t ('description.AdminUsersListId')}{user._id}</div>
                <div>{t ('description.AdminUsersListRoles')}{user.roles}</div>
                <div>{t ('description.AdminUsersListAvatar')}{user.avatar}</div>
                {user.iat !== 0 ?
                  <div>
                    <div>
                      {t ('description.AdminUsersListLoginTime')}{moment.unix(user.iat).format("hh:mm:ss DD.MM.YYYY")}
                    </div>
                    <div>
                      {t ('description.AdminUsersListTokenExp')}{moment.unix(user.exp).format("hh:mm:ss DD.MM.YYYY")}
                    </div>
                  </div>
                :
                  <div>
                    {t ('description.AdminUsersListStatus')}
                  </div>
                }
                <div>{t ('description.AdminUsersListRegistration')}{moment(user.registrationDate).format('llll')}</div>
              </div>
            </ListItem>
          );
        })}
        <Paper className={classes.paperButton}>
          <Button onClick={deleteAll}>{t ('description.AdminUsersListDeleteAll')} {allUsers.length}</Button>
          <div className={styles.delete__button}>
            <Button onClick={deleteAccount}>{t ('description.AdminUsersListDelete')}</Button>
            <div>{(count)}</div>
          </div>
        </Paper>
    </List>
  );
}

export default UsersList