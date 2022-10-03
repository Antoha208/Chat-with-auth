import React, { useCallback, useEffect } from 'react'


import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'


import styles from './AuthData.module.css'
import AvatarComp from '../AvatarComp/AvatarComp'
import { getUsers } from '../../../http/userApi'

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
                        <AccountCircle className = {styles.icon} />
                    </Grid>
                    <Grid item>
                        <TextField 
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
                                    label="Confirmation"
                                    type={`${states.visible && ("password")}`}
                                    value = {states.passwordConf}
                                    onChange = {e => {localDispatch({type: 'passwordConf', payload: e.target.value}); localDispatch({type: 'error'})}}
                                />
                            :
                                <TextField
                                    className = {styles.password}
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