import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styles from './Admin.module.css'
import useStyles from './makeStyles';
import { getUsers } from '../../http/userApi';
import { setAllUsers } from '../../store/usersListReducer';
import UsersList from '../../components/Admin/UsersList';
import AdminPic from '../../components/Admin/AdminPic';
import NavBar from '../../components/NavBar/NavBar/NavBar.js'

const Admin = () => {
  const classes = useStyles()
  const [showButton, setShowButton] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.users.users)

  const showUsers = async () => {
    try {
      let users;
        users = await getUsers()
        const usersDB = users.map(user => user.username)
        const storeUsers = allUsers.map(user => user.username)
        const matchUsers = storeUsers.some(user => user === usersDB.reduce(element => element))
        

        
        // const newObj = users.map(el => Object.assign(el, {iat: '', exp: ''}))
        // console.log(newObj)

        

        //  console.log(user.username, user.iat, user.exp)
        //  console.log(users)

        //  console.log(allUsers)

        if (matchUsers) {
          setShowButton(!showButton)
        } else {
          dispatch(setAllUsers(users))
          setShowButton(!showButton)
        }
    } catch (error) {
      alert(error)
    }
  }

  const hideUsers = () => {
    setShowButton(!showButton)
  }

  return (
    <Card className={styles.container}>
      <NavBar />
      <div className={styles.card}>
        <Card className={classes.avatarContainer}>
          <AdminPic />
        </Card>
        <Card className={classes.infoContainer}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Username: {user.username}</Paper>
            </Grid>
            {showButton ?
              <Grid item xs={12}>
                <Paper className={classes.paper}>Show all users
                  <Button onClick={showUsers}>Show users</Button>
                </Paper>
              </Grid>
            :
              <Grid item xs={12}>
                <UsersList />
                <Paper className={classes.paperButton}>
                  <Button onClick={hideUsers}>Hide users</Button>
                </Paper>
              </Grid>
            }
          </Grid>
        </Card>
      </div>
    </Card>
  )

}


export default Admin
