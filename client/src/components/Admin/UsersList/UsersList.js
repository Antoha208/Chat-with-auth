import React, { useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'


import useStyles from './makeStyles'
import styles from './UsersList.module.css'
import localReducer from './localReducer'
import UserComp from '../UserComp/UserComp'
import { REGISTRATION_ROUTE } from '../../../utils/consts'
import { deleteAllUsers, deleteOneUser } from '../../../http/userApi'


const UsersList = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const userStore = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.users.users)
  const [states, localDispatch] = useReducer(localReducer, {checked: [1], count: '', search: ''})
  const navigate = useNavigate()

  const filterUsers = allUsers.filter(user => {
    return user.username.toLowerCase().includes(states.search.toLowerCase())
  })
    
  const deleteAll = async () => {
    await deleteAllUsers()
    localDispatch({type: 'checked', payload: true})
    navigate(REGISTRATION_ROUTE)
  }

  const deleteAccount = async () => {
    if (userStore.id === states.checked[1]._id) {
      await deleteOneUser(userStore.id)
      navigate(REGISTRATION_ROUTE)
    } else {
      await deleteOneUser(states.checked[1]._id)
    }
  } 
    
  return (
    <List dense className={classes.root}>
      <Paper component="form" className={classes.inputWrap}>
        <InputBase
          className={classes.input}
          placeholder={t ('description.AdminUsersSearch')}
          value={states.search}
          onChange={(e) => localDispatch({type: 'search', payload: e.target.value})}
        />
        <IconButton disabled className={classes.iconButton}>
          <SearchIcon className = {styles.icon} />
        </IconButton>
      </Paper>
        {filterUsers.map((user, index) => {
          return (
            <UserComp 
              user={user}
              index={index}
              states={states}
              localDispatch={localDispatch}
            />
          )
        })}
        <Paper className={classes.paperButton}>
          <Button onClick={deleteAll}>{t ('description.AdminUsersListDeleteAll')} {allUsers.length}</Button>
          <div className={styles.delete__button}>
            <Button onClick={deleteAccount}>{t ('description.AdminUsersListDelete')}</Button>
            <div>{(states.count)}</div>
          </div>
        </Paper>
    </List>
  );
}

export default UsersList