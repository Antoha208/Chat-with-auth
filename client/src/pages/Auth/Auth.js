import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

import styles from './Auth.module.css'
import { CHATS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { registration, login } from '../../http/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsAuth } from '../../store/authReducer';
import { setUser } from '../../store/userReducer';
import BcgElements from '../../components/Auth/BcgElements';


const Auth = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const isAuth = useSelector(state => state.isAuth.isAuth)  

  const click = async () => {
    try {
      let userData;
      if (isLogin) {
        userData = await login(username, password)
      } else {
        userData = await registration(username, password)
      }
      setUsername('')
      setPassword('')

      dispatch(setUser(userData.id, userData.username, userData.roles, userData.iat, userData.exp))
      localStorage.setItem('user', JSON.stringify(userData))
      dispatch(changeIsAuth(true))
      navigate(CHATS_ROUTE)
    } catch (error) {
      alert(error.response.data.message)
    }
    
  }

  return (
    <div className = { styles.container }>
      <BcgElements />
      <h2 className = { styles.title }>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
      <div className = { styles.card }>
        <CardContent>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField 
                id="input-with-icon-grid" 
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
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                value = {password}
                onChange = {e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>    
        </CardContent>
        <div className = { styles.card__buttons }>
          <div className = { styles.card__sign }
            onClick = {click}
          >{isLogin ? 'Войти' : 'Регистрация'}</div>
          {isLogin ?
            <div className = { styles.card__reg }>Нет аккаунта? <NavLink to = {REGISTRATION_ROUTE}> Зарегистрируйтесь!</NavLink></div>
          :
            <div className = { styles.card__reg }>Есть аккаунт?  <NavLink to = {LOGIN_ROUTE}> Войдите!</NavLink></div>
          }
        </div>
      </div>
    </div>
  )

}

export default Auth;
