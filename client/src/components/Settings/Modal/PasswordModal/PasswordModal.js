import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'


import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'
import styles from './PasswordModal.module.css'
import { Context } from '../../context.js'
import { updateCheckedUserPassword } from '../../../../http/userApi.js'


const PasswordModal = () => {
  const classes = useClasses(stylesJS)
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
        alert(`${t ('description.PasswordModalAlert1')}`)
        closeCheckBar()
      } else {
        alert(`${t ('description.PasswordModalAlert2')}`)
      }
    
    } catch (error) {
      switch (error.response.data.message) {
        case 'Ошибка! Убедитесь в том, что поле password содержит от 6и до 12и символов.':
          alert(`${t ('description.BackendErrorPasswordModal1')}`)
          break;
        case 'Поле password не было изменено':
          alert(`${t ('description.BackendErrorPasswordModal2')}`)
          break;
        default:
          break;
      }
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
              <AccountCircleRoundedIcon className={styles.icon__disabled} />
            </Grid>
            <Grid item>
              <TextField 
                variant="standard"
                label={t ('description.PasswordModalPassword')}
                type='password'
                value = {password}
                onChange = {e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircleRoundedIcon className={styles.icon__disabled} />
            </Grid>
            <Grid item>
              <TextField 
                variant="standard"
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
  )
}

export default PasswordModal
