import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import i18n from '../../Language/i18n.js'


import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'


import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'
import styles from './AcceptModal.module.css'
import { Context } from '../../context.js'
import { changeTheme, changeLanguage } from '../../../../store/userReducer.js'
import { setTheme, setLanguage } from '../../../../http/userApi.js' 


const AcceptModal = () => {
  const classes = useClasses(stylesJS)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userStore = useSelector(state => state.user.user )
  const { closeAcceptBar, acceptTheme, acceptLanguage, states } = useContext(Context)
  
  const accept = async () => {
    switch (states.selected) {
      case 'theme':
        acceptTheme()
        await setTheme(userStore.id).then(data => {
          if (data.includes('Dark')) {
            dispatch(changeTheme(['Light']))
          } else {
            dispatch(changeTheme(['Dark']))
          }
        })
        break;
      case 'lang':
        acceptLanguage()
        await setLanguage(userStore.id).then(data => {
          console.log(data)
          if (!data.includes(userStore.language)) {
            dispatch(changeLanguage(data))
            if (data.includes('Russian')) {
              i18n.changeLanguage('ru')
            } else {
              i18n.changeLanguage('en')
            }
          }
        })
        break;
      case '':
        alert(`${t ('description.AcceptModalAlert')}`)
        break;
      default:
        break;
    }
    closeAcceptBar()
  } 

  const handleCloseAccept = () => {
    closeAcceptBar()
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.title__text}>{t ('description.AcceptModalTitle')}</div>
          <IconButton className={classes.button} onClick={handleCloseAccept}>
            <ClearRoundedIcon className={styles.icon} />
          </IconButton>
        </div>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <LiveHelpRoundedIcon className={styles.icon__disabled} />
            </Grid>
            <Grid item>
              <p>{t ('description.AcceptModalText')}</p>
            </Grid>
          </Grid>
          <Button className={classes.button} onClick={accept}>{t ('description.AcceptModalAccept')}</Button>
        </CardContent>
      </div>
    </div>
  )
}

export default AcceptModal
