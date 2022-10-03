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
import styles from './SimpleModal.module.css'
import { Context } from '../../context'
import { checkPassword } from '../../../../http/userApi'
import UsernameModal from '../UsernameModal/UsernameModal'
import PasswordModal from '../PasswordModal/PasswordModal'


const SimpleModal = () => {
  const classes = useStyles()
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
                <AccountCircle className={styles.icon__disabled} />
              </Grid>
              <Grid item>
                <TextField 
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