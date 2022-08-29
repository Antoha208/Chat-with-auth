import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'

import styles from './Auth.module.css'
import { CHATS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import { registration, login, addLogInfo } from '../../http/userApi'
import { changeIsAuth } from '../../store/authReducer'
import { setUser } from '../../store/userReducer'
import BcgElements from '../../components/Auth/BcgElements'


const Auth = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(true)

  const dispatch = useDispatch()

  const click = async () => {
    try {
      let userData;
      if (isLogin) {
        userData = await login(username, password)
        dispatch(setUser(
          userData.id, 
          userData.username, 
          userData.roles, 
          userData.theme, 
          userData.language,
          userData.chats, 
          userData.iat, 
          userData.exp, 
          userData.avatar, 
          userData.about
        ))
      } else {
        userData = await registration(username, password)
        dispatch(setUser(
          userData.id, 
          userData.username,
          userData.roles,
          userData.theme,
          userData.language,
          userData.chats,
          userData.iat,
          userData.exp, 
          userData.avatar, 
          userData.about, 
          userData.registrationDate))
      }

      await addLogInfo(userData.iat, userData.exp)

      dispatch(changeIsAuth(true))
      navigate(CHATS_ROUTE)
    } catch (error) {
      alert(error.response.data.message)
    }
    
  }

  return (
    <div className = { styles.wrapper }>
      <div className = { styles.container }>
        <BcgElements />
        <h2 className = { styles.title }>{isLogin ? <div>{t ('description.AuthSignInCaps')}</div> : <div>{t ('description.AuthSignUpAccountCaps')}</div>}</h2>
        <div className = { styles.card }>
          <CardContent>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle className = {styles.icon} />
              </Grid>
              <Grid item>
                <TextField 
                  label="Username"
                  value = {username}
                  onChange = {e => setUsername(e.target.value)} 
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <VisibilityRoundedIcon className = {styles.icon__visible} onClick={() => setVisible(!visible)} />
              </Grid>
              <Grid item>
                <TextField
                  className = {styles.password}
                  label="Password"
                  type={visible && ("password")}
                  value = {password}
                  onChange = {e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>    
          </CardContent>
          <div className = { styles.card__buttons }>
            <div className = { styles.card__sign }
              onClick = {click}
            >
              {isLogin ? <div>{t ('description.AuthSignIn')}</div> : <div>{t ('description.AuthSignUpAccount')}</div>}</div>
            {isLogin ?
              <div className = { styles.card__reg }>{t ('description.AuthNeedAccount')} <NavLink to = {REGISTRATION_ROUTE} className = { styles.card__reg }> {t ('description.AuthSignUpAccount')}</NavLink></div>
            :
              <div className = { styles.card__reg }>{t ('description.AuthHasAccount')}  <NavLink to = {LOGIN_ROUTE} className = { styles.card__reg }> {t ('description.AuthSignIn')}</NavLink></div>
            }
          </div>
        </div>
        <div className = {styles.table}></div>
      </div>
    </div>
  )

}

export default Auth;
