import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


import { Button, IconButton } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'


import useStyles from './makeStyles'
import styles from './PasswordModal.module.css'
import { Context } from '../../context'
import { updateCheckedUserPassword } from '../../../../http/userApi'


const PasswordModal = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const userStore = useSelector(state => state.user.user )
  const { closeCheckBar } = useContext(Context)
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  
  const changePassword = async () => {
    try {
      let userData;
      if (password === confPassword) {
        userData = await updateCheckedUserPassword(userStore.id, password)
        alert('Пароль изменен')
        closeCheckBar()
      } else {
        alert('Пароли не совпадают')
      }
    
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
          <div className={styles.title__text}>{t ('description.PasswordModalTitle')}</div>
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
                label={t ('description.PasswordModalPassword')}
                type='password'
                value = {password}
                onChange = {e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle className={styles.icon__disabled} />
            </Grid>
            <Grid item>
              <TextField 
                label={t ('description.PasswordModalConfirmPassword')}
                type='password'
                value = {confPassword}
                onChange = {e => setConfPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button className={classes.button} onClick={changePassword}>{t ('description.PasswordModalAccept')}</Button>
        </CardContent>
      </div>
    </div>
  );
}

export default PasswordModal