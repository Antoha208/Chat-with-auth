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
import { changeUsername } from '../../../../store/userReducer'


const UsernameModal = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const userStore = useSelector(state => state.user.user )
  const dispatch = useDispatch()
  const { closeCheckBar } = useContext(Context)
  const [username, setUsername] = useState('')
  
  const editUsername = async () => {
    try {
      let userData;
      userData = await updateCheckedUserUsername(userStore.id, username)
      console.log(userData)
      alert(`${t ('description.UsernameModalAlert')}`)
      
      dispatch(changeUsername(userData.username))

      closeCheckBar()
    } catch (error) {
      switch (error.response.data.message) {
        case 'Ошибка! Убедитесь в том, что поле Username не пустое и содержит два слова.':
          alert(`${t ('description.BackendErrorUsernameModal1')}`)
          break;
        case 'Поле username не было изменено или занято':
          alert(`${t ('description.BackendErrorUsernameModal2')}`)
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
          <Button className={classes.button} onClick={editUsername}>{t ('description.UsernameModalAccept')}</Button>
        </CardContent>
      </div>
    </div>
  )
}

export default UsernameModal