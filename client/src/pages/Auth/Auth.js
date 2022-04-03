import React from "react";
import { NavLink, useLocation } from "react-router-dom";

//import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

import styles from './Auth.module.css'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE


  return (
    <div className = { styles.container }>
      <h2 className = { styles.title }>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
      <div className = { styles.card }>
        <CardContent>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Username" />
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
              />
            </Grid>
          </Grid>    
        </CardContent>
        <div className = { styles.card__buttons }>
          <div className = { styles.card__sign }>{isLogin ? 'Войти' : 'Регистрация'}</div>
          {isLogin ?
            <div className = { styles.card__reg }>Нет аккаунта? <NavLink to = {REGISTRATION_ROUTE}> Зарегистрируйтесь!</NavLink></div>
          :
            <div className = { styles.card__reg }>Есть аккаунт? <NavLink to = {LOGIN_ROUTE}> Войдите!</NavLink></div>
          }
        </div>
      </div>
    </div>
  )

}

export default Auth;
