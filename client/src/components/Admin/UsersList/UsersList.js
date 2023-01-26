import React, { useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'


import stylesJS from './makeStyles.js'
import useClasses from '../../../CustomHooks/useClasses.js'
import styles from './UsersList.module.css'
import localReducer from './localReducer.js'
import UserComp from '../UserComp/UserComp.js'
import { REGISTRATION_ROUTE } from '../../../utils/consts.js'
import { deleteAllUsers, deleteOneUser } from '../../../http/userApi.js'


const UsersList = () => {
  const { t } = useTranslation()
  const classes = useClasses(stylesJS)
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
          <SearchRoundedIcon className = {styles.icon} />
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
