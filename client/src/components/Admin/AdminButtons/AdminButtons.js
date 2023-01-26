import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'


import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'


import stylesJS from './makeStyles.js'
import useClasses from '../../../CustomHooks/useClasses.js'
import { getUsers } from '../../../http/userApi.js'
import { setAllUsers, resetAllUsers } from '../../../store/usersListReducer.js'
import UsersList from '../UsersList/UsersList.js'

const AdminButtons = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const classes = useClasses(stylesJS)
    const [showButton, setShowButton] = useState(true)
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
    )
}

export default AdminButtons
