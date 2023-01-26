import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SpellcheckRoundedIcon from '@mui/icons-material/SpellcheckRounded'


import styles from './ProfileInfo.module.css'
import stylesJS from './makeStyles.js'
import useClasses from '../../../CustomHooks/useClasses.js'
import { addAboutInfo, deleteOneUser } from '../../../http/userApi.js'
import { resetApp } from '../../../store/index.js'
import { REGISTRATION_ROUTE } from '../../../utils/consts.js'
import { changeAbout } from '../../../store/userReducer.js'
import { deleteAllChats } from '../../../http/chatsApi.js'

const ProfileInfo = () => {
    const classes = useClasses(stylesJS)
    const { t } = useTranslation()
    const userStore = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const checkingName = userStore.about === undefined ? <div>{t ('description.ProfileAddAbout')}</div> : userStore.about
    const [name, setName] = useState(checkingName)
    const [isText, setIsText] = useState(false)
    const navigate = useNavigate()
    const timestampIat = moment.unix(userStore.iat).format("hh:mm:ss DD.MM.YYYY")
    const timestampExp = moment.unix(userStore.exp).format("hh:mm:ss DD.MM.YYYY")

    const changeText = (e) => {
        setIsText(true)
        setName(e.target.value)
      }
    
      const acceptText = async () => {
        await addAboutInfo(name)
        dispatch(changeAbout(name))
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
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>{t ('description.ProfileUsername')} {userStore.username}</Paper>
            </Grid>
            <Grid item xs={12}>
                {!isText ?
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
    )
}

export default ProfileInfo
