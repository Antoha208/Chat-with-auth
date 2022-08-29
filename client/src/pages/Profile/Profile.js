import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { Button, Card, InputBase } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import SpellcheckRoundedIcon from '@material-ui/icons/SpellcheckRounded'

import styles from './Profile.module.css'
import useStyles from './makeStyles'
import ProfileData from '../../components/Profile/ProfileData'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import { addAboutInfo, deleteOneUser, getOneUser } from '../../http/userApi'
import { resetApp } from '../../store/index'
import { REGISTRATION_ROUTE } from '../../utils/consts'
import { setUser } from '../../store/userReducer'
import { deleteAllChats } from '../../http/chatsApi'
import { deleteAllMessages } from '../../http/messagesApi'

const Profile = () => {
  const userStore = useSelector(state => state.user.user)
  const chatsStore = useSelector(state => state.chats.chats)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect( () => {
    getOneUser(userStore.id).then(data => dispatch(setUser(
      userStore.id, 
      data.username, 
      data.roles,
      userStore.theme,
      userStore.language,
      userStore.chats, 
      data.iat, 
      data.exp, 
      data.avatar, 
      data.about
    )))
  }, [])
  
  const checkingName = userStore.about === undefined ? <div>{t ('description.ProfileAddAbout')}</div> : userStore.about

  const [name, setName] = useState(checkingName)
  const [isText, setIsText] = useState(false)
  const navigate = useNavigate()
  const classes = useStyles()

  // useEffect(() => {
  // }, [name]);
  
  const timestampIat = moment.unix(userStore.iat).format("hh:mm:ss DD.MM.YYYY")
  const timestampExp = moment.unix(userStore.exp).format("hh:mm:ss DD.MM.YYYY")
  
  const changeText = (e) => {
    setIsText(true)
    setName(e.target.value)
    dispatch(setUser(
      userStore.id, 
      userStore.username, 
      userStore.roles, 
      userStore.theme, 
      userStore.language,
      userStore.chats, 
      userStore.iat, 
      userStore.exp, 
      userStore.avatar,  
      name
    ))
  }

  const acceptText = async () => {
    await addAboutInfo(name)
    console.log(checkingName)
    dispatch(setUser(
      userStore.id, 
      userStore.username, 
      userStore.roles, 
      userStore.theme, 
      userStore.language,
      userStore.chats,
      userStore.iat, 
      userStore.exp, 
      userStore.avatar,  
      name
    ))
    setIsText(false)
  }

  const deleteAccount = async () => {
    try {
      await deleteAllChats(userStore.id)
      await deleteOneUser(userStore.id)
      dispatch(resetApp())
      localStorage.clear()
      navigate(REGISTRATION_ROUTE)
    } catch (error) {
      alert(error)
    }
  } 

  return (
    <Card className={styles.container}>
      <NavBar />
      <div className={styles.card}>
        <Card className={classes.avatarContainer}>
          <ProfileData />   
        </Card>
        <Card className={classes.infoContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{t ('description.ProfileUsername')} {userStore.username}</Paper>
            </Grid>
            <Grid item xs={12}>
              { !isText ?
                <Paper className={classes.paper}>
                  <div className={styles.about__container}>{t ('description.ProfileAbout')} {userStore.about === undefined ? <div>{t ('description.ProfileAddAbout')}</div> : name}</div>
                  <Button onClick = {changeText}>
                    <Tooltip title={t ('description.ProfileChangeTooltip')} arrow>
                      <EditRoundedIcon className={styles.icon} />
                    </Tooltip>
                  </Button>
                </Paper>  
              :
                <Paper className={classes.paperAbout}>{t ('description.ProfileAbout')} 
                  <InputBase
                    className={classes.about} 
                    value={name || ''} 
                    onChange={(e) => changeText(e)}   
                  />
                  <div>
                    <Button onClick = {acceptText}>
                      <Tooltip title={t ('description.MessageAcceptTooltip')} arrow>
                        <SpellcheckRoundedIcon className={styles.icon} />
                      </Tooltip>
                    </Button>
                  </div>
                </Paper>  
              }  
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{t ('description.ProfileRoles')} {userStore.roles}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{t ('description.ProfileAccess')} {timestampExp}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{t ('description.ProfileLastLogin')} {timestampIat}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Button onClick={deleteAccount}>{t ('description.ProfileDeleteAcc')}</Button>
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Card>
  )

}


export default Profile
