import React, { useCallback, useEffect } from 'react'


import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'


import styles from './AuthData.module.css'
import AvatarComp from '../AvatarComp/AvatarComp.js'
import { getUsers } from '../../../http/userApi.js'

const AuthData = ({isLogin, states, localDispatch}) => {

    useEffect(() => {
        localDispatch({type: 'username', payload: ''})
        localDispatch({type: 'password', payload: ''})
    }, [isLogin])

    const getAvatar = useCallback(async () => {
        try {
          let users;
            if (states.username !== '') {
                users = await getUsers()
                const findUser = users.find(el => el.username === states.username)
                if (findUser !== undefined) {
                    return findUser
                } else {
                    return 'error'
                }
            }
        } catch (error) {
          alert(error)
        }
    }, [states.username])

  return (
        <>
            <CardContent>
                {isLogin && (
                    <Grid container justifyContent='center'>
                        <AvatarComp 
                            getAvatar={getAvatar}
                        />
                    </Grid>
                )}
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircleRoundedIcon className = {styles.icon} />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="standard" 
                            label="Username"
                            value = {states.username}
                            onChange = {e => localDispatch({type: 'username', payload: e.target.value})} 
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <VisibilityRoundedIcon className = {styles.icon__visible} onClick={() => localDispatch({type: 'visible'})} />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="standard"
                            className = {styles.password}
                            label="Password"
                            type={`${states.visible && ("password")}`}
                            value = {states.password}
                            onChange = {e => localDispatch({type: 'password', payload: e.target.value})}
                        />
                    </Grid>
                </Grid>    
            </CardContent>
            {!isLogin && (
                <CardContent>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <VisibilityRoundedIcon className = {styles.icon__visible} onClick={() => localDispatch({type: 'visible'})} />
                        </Grid>
                        <Grid item>
                            {states.error ?
                                <TextField
                                    error
                                    className = {styles.password}
                                    variant="standard"
                                    label="Confirmation"
                                    type={`${states.visible && ("password")}`}
                                    value = {states.passwordConf}
                                    onChange = {e => {localDispatch({type: 'passwordConf', payload: e.target.value}); localDispatch({type: 'error'})}}
                                />
                            :
                                <TextField
                                    className = {styles.password}
                                    variant="standard"
                                    label="Confirmation"
                                    type={`${states.visible && ("password")}`}
                                    value = {states.passwordConf}
                                    onChange = {e => localDispatch({type: 'passwordConf', payload: e.target.value})}
                                />
                            }
                        </Grid>
                    </Grid>    
                </CardContent>
            )}
        </>
  )
}

export default AuthData
