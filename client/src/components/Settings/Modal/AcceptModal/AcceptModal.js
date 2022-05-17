import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'


import { Button, IconButton } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import Grid from '@material-ui/core/Grid'
import LiveHelpRoundedIcon from '@material-ui/icons/LiveHelpRounded'


import useStyles from './makeStyles'
import styles from './AcceptModal.module.css'
import { Context } from '../../context'
import { setUser } from '../../../../store/userReducer'
import { setTheme, setLanguage } from '../../../../http/userApi' 


const AcceptModal = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userStore = useSelector(state => state.user.user )
  const { closeAcceptBar, acceptTheme, darkTheme, acceptLanguage, selected } = useContext(Context)
  

  const accept = async () => {

    if (selected === 'theme') {
      acceptTheme()
      await setTheme(userStore.id)
      
      dispatch(setUser(
        userStore.id, 
        userStore.username, 
        userStore.roles, 
        darkTheme, 
        userStore.language, 
        userStore.iat, 
        userStore.exp, 
        userStore.avatar, 
        userStore.about
      ))
    } else if (selected === 'lang') {
      
      acceptLanguage()
      await setLanguage(userStore.id).then(data => {
        dispatch(setUser(
          userStore.id, 
          userStore.username,
          userStore.roles, 
          userStore.theme, 
          data,
          userStore.iat, 
          userStore.exp, 
          userStore.avatar, 
          userStore.about
        ))
      })
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
  );
}

export default AcceptModal