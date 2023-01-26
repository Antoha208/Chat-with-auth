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
import styles from './SimpleModal.module.css'
import { Context } from '../../context.js'
import { checkPassword } from '../../../../http/userApi.js'
import UsernameModal from '../UsernameModal/UsernameModal.js'
import PasswordModal from '../PasswordModal/PasswordModal.js'


const SimpleModal = () => {
  const classes = useClasses(stylesJS)
  const { t } = useTranslation()
  const userStore = useSelector(state => state.user.user )
  const { closeCheckBar, states } = useContext(Context)
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)


  const check = async () => {
    try {
      let userData;
        userData = await checkPassword(userStore.id, password)

        if (userData) {
          setChecked(true)
        }

    } catch (error) {
      alert(`${t ('description.BackendErrorAuth2')}`)
    }
  }

  const handleCloseCheck = () => {
    closeCheckBar()
  }

  return (
    <div>
      {checked ?
        states.selected === 'username' ? <UsernameModal /> : <PasswordModal />
      :
        <div className={styles.container}>
          <div className={styles.title}>
            <div className={styles.title__text}>{t ('description.SimpleModalTitle')}</div>
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
                  label={t ('description.SimpleModalPassword')}
                  type='password'
                  value = {password}
                  onChange = {e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button className={classes.button} onClick={check}>{t ('description.SimpleModalAccept')}</Button>
          </CardContent>
        </div>
      }
    </div>   
  )
}

export default SimpleModal
