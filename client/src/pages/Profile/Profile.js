import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';
// import { useNavigate } from "react-router-dom"; 

import { Button, Card, InputBase } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import styles from './Profile.module.css'
import useStyles from './makeStyles'
import ProfileData from '../../components/Profile/ProfileData'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import telegram from '../../components/Profile/img/telegram.png'
import whatsapp from '../../components/Profile/img/whatsapp.png'
import vk from '../../components/Profile/img/vk.png'

const Profile = () => {
  const [name, setName] = useState('');

  const classes = useStyles()

  const userStore = useSelector(state => state.user.user)

  const changeText = (e) => {
    setName(e.target.value);
  };

  const timestampIat = moment.unix(userStore.iat).format("hh:mm:ss DD.MM.YYYY")
  const timestampExp = moment.unix(userStore.exp).format("hh:mm:ss DD.MM.YYYY")
  // const regDate = moment(userStore.registrationDate).format('llll')

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
              { name === '' ?
              <Paper className={classes.paper}>About:
                <Button onClick = {changeText}>
                  <EditRoundedIcon />
                </Button>
              </Paper>  
              :
              <Paper className={classes.paper}>About: 
                  <InputBase className={classes.about} value={name} onChange={changeText} />
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
              {/* <Paper className={classes.paper}>Registration date: {regDate}</Paper> */}
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paperSmall}>
                <img src = { telegram } alt = 'telegram' className = { styles.telegram } />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paperSmall}>
              <img src = { whatsapp } alt = 'whatsapp' className = { styles.whatsapp } />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paperSmall}>
              <img src = { vk } alt = 'vk' className = { styles.vk } />
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Card>
  )

}


export default Profile;
