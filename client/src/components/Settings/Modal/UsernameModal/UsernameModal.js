import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'


import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'


import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'
import styles from './UsernameModal.module.css'
import { Context } from '../../context.js'
import { updateCheckedUserUsername } from '../../../../http/userApi.js'
import { changeUsername } from '../../../../store/userReducer.js'


const UsernameModal = () => {
  const classes = useClasses(stylesJS)
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
              <AccountCircleRoundedIcon className={styles.icon__disabled} />
            </Grid>
            <Grid item>
              <TextField
                variant="standard" 
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
