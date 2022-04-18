import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom"; 

import { Card } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import styles from './Settings.module.css'
import useStyles from './makeStyles'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import SettingsPic from "../../components/Settings/SettingsPic";

const Settings = () => {

  const classes = useStyles()

  const username = useSelector(state => state.user.user.username)
  const roles = useSelector(state => state.user.user.roles)

  return (
    <Card className={styles.container}>
      <NavBar />
      <div className={styles.card}>
        <Card className={classes.avatarContainer}>
          <SettingsPic />
        </Card>
        <Card className={classes.infoContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Username: {username}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Change my password</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Theme</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Language</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Keyboard shortcuts</Paper>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Card>
  )

}


export default Settings;
