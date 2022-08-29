import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'


import { Button, IconButton } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'


import useStyles from './makeStyles'
import styles from './UsernameModal.module.css'
import { Context } from '../../context'
import { updateCheckedUserUsername } from '../../../../http/userApi'
import { setUser } from '../../../../store/userReducer'


const UsernameModal = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const userStore = useSelector(state => state.user.user )
  const dispatch = useDispatch()
  const { closeCheckBar } = useContext(Context)
  const [username, setUsername] = useState('')
  
  const changeUsername = async () => {
    try {
      let userData;
        userData = await updateCheckedUserUsername(userStore.id, username)
      console.log(userData)
        alert(`${t ('description.UsernameModalAlert')}`)
      
      dispatch(setUser(
        userStore.id, 
        username, 
        userStore.roles, 
        userStore.theme, 
        userStore.language,
        userStore.chats, 
        userStore.iat, 
        userStore.exp, 
        userStore.avatar, 
        userStore.about
      ))

      closeCheckBar()
    } catch (error) {
      alert(error)
    }
  }

  const handleCloseCheck = () => {
    closeCheckBar()
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.title__text}>{t ('description.UsernameModalTitle')}</div>
          <IconButton className={classes.button} onClick={handleCloseCheck}>
            <ClearRoundedIcon className={styles.icon} />
          </IconButton>
        </div>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle className={styles.icon__disabled} />
            </Grid>
            <Grid item>
              <TextField 
                label={t ('description.UsernameModalNewUsername')}
                value = {username}
                onChange = {e => setUsername(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button className={classes.button} onClick={changeUsername}>{t ('description.UsernameModalAccept')}</Button>
        </CardContent>
      </div>
    </div>
  );
}

export default UsernameModal