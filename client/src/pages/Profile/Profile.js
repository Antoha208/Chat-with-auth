import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useNavigate } from "react-router-dom"; 

import { Button, Card, InputBase } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SpellcheckRoundedIcon from '@material-ui/icons/SpellcheckRounded';

import styles from './Profile.module.css'
import useStyles from './makeStyles'
import ProfileData from '../../components/Profile/ProfileData'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import { addAboutInfo, deleteOneUser, getOneUser } from "../../http/userApi";
import { REGISTRATION_ROUTE } from "../../utils/consts";
import { setUser } from '../../store/userReducer'

const Profile = () => {
  const userStore = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  useEffect( () => {
    getOneUser(userStore.id).then(data => dispatch(setUser(userStore.id, data.username, data.roles, data.iat, data.exp, data.avatar, data.about)))
  }, [])
  
  const checkingName = userStore.about === undefined ? 'Add some text...' : userStore.about

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
    dispatch(setUser(userStore.id, userStore.username, userStore.roles, userStore.iat, userStore.exp, userStore.avatar, name))
  }

  const acceptText = async () => {
    await addAboutInfo(name)
    console.log(checkingName)
    dispatch(setUser(userStore.id, userStore.username, userStore.roles, userStore.iat, userStore.exp, userStore.avatar, name))
    setIsText(false)
  }

  const deleteAccount = async () => {
    await deleteOneUser(userStore.id)
    navigate(REGISTRATION_ROUTE)
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
              <Paper className={classes.paper}>Username: {userStore.username}</Paper>
            </Grid>
            <Grid item xs={12}>
              { !isText ?
                <Paper className={classes.paper}>
                  <div>About: {userStore.avatar === undefined ? 'Add some text...' : name}</div>
                  <Button onClick = {changeText}>
                    <EditRoundedIcon />
                  </Button>
                </Paper>  
              :
                <Paper className={classes.paperAbout}>About: 
                  <InputBase
                    className={classes.about} 
                    value={name} 
                    onChange={(e) => changeText(e)}   
                  />
                  <div>
                    <Button onClick = {acceptText}>
                      <SpellcheckRoundedIcon />
                    </Button>
                  </div>
                </Paper>  
              }  
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>My roles: {userStore.roles}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Access exp. time: {timestampExp}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Last login date: {timestampIat}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Button className={styles.button}  onClick={deleteAccount}>Delete account</Button>
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Card>
  )

}


export default Profile;
