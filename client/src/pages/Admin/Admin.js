import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 

import { Card } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styles from './Admin.module.css'
import useStyles from './makeStyles';
import { CHATS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { changeIsAuth } from '../../store/authReducer';
import { setUser } from '../../store/userReducer';
import AdminPic from '../../components/Admin/AdminPic';
import NavBar from '../../components/NavBar/NavBar/NavBar.js'

const Admin = () => {

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const open = Boolean(anchorEl);
  const username = useSelector(state => state.user.user.username)
  const roles = useSelector(state => state.user.user.roles)
  const auth = useSelector(state => state.isAuth.isAuth)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleChats = () => {
    setAnchorEl(null);
    navigate(CHATS_ROUTE)
  }

  const handleProfile = () => {
    setAnchorEl(null);
    navigate(PROFILE_ROUTE)
  }

  const handleSettings = () => {
    setAnchorEl(null);
    navigate(SETTINGS_ROUTE)
  }

  const logout = () => {
    dispatch(setUser(null))
    dispatch(changeIsAuth(false))
    localStorage.clear()
    navigate(LOGIN_ROUTE)
  }

  return (
    <Card className={styles.container}>
      <NavBar />
      <div className={styles.card}>
        <Card className={classes.avatarContainer}>
          <AdminPic />
        </Card>
        <Card className={classes.infoContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Username: {username}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Show all users
                <Button>Delete user</Button>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Stay Positive</Paper>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Card>
  )

}


export default Admin
