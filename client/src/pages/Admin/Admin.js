import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import { Card } from "@material-ui/core"
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import styles from './Admin.module.css'
import useStyles from './makeStyles'
import { getUsers } from '../../http/userApi'
import { setAllUsers, resetAllUsers } from '../../store/usersListReducer'
import UsersList from '../../components/Admin/UsersList/UsersList'
import AdminPic from '../../components/Admin/Picture/AdminPic'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'

const Admin = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [showButton, setShowButton] = useState(true)
  const dispatch = useDispatch()
  const userStore = useSelector(state => state.user.user)
  const allUsers = useSelector(state => state.users.users)

  const showUsers = async () => {
    try {
      let users;
        users = await getUsers()
        const usersDB = users.map(user => user.username)
        const storeUsers = allUsers.map(user => user.username)
        const matchUsers = storeUsers.some(user => user === usersDB.reduce(element => element))


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
    dispatch(resetAllUsers())
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
              <Paper className={classes.paper}>{t ('description.AdminUsername')} {userStore.username}</Paper>
            </Grid>
            {showButton ?
              <Grid item xs={12}>
                <Paper className={classes.paper}>{t ('description.AdminShowUsersText')}
                  <Button onClick={showUsers}>{t ('description.AdminShowUsersButton')}</Button>
                </Paper>
              </Grid>
            :
              <Grid item xs={12}>
                <UsersList />
                <Paper className={classes.paperButton}>
                  <Button onClick={hideUsers}>{t ('description.AdminHideUsers')}</Button>
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
