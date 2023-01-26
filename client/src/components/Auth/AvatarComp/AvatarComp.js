import React, { useEffect, useReducer } from 'react'


import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'


import stylesJS from './makeStyles.js'
import useClasses from '../../../CustomHooks/useClasses.js'
import localReducer from './localReducer.js'
import LoaderInside from '../../LoaderInside/LoaderInside.js'

const AvatarComp = ({getAvatar}) => {
    const classes = useClasses(stylesJS)
    const [states, localDispatch] = useReducer(localReducer, {avatar: '', role: '', loading: true})
    
    useEffect(() => {
        localDispatch({type: 'loadingTrue'})
        const search = setTimeout(() => {
            const gotAvatar = getAvatar().then(data => {
                if (data !== 'error' && data !== undefined) {
                    localDispatch({type: 'avatar', payload: data.avatar})
                    localDispatch({type: 'role', payload: data.roles.find(el=>el)})
                } else {
                    localDispatch({type: 'avatar', payload: ''})
                    localDispatch({type: 'role', payload: ''})
                }
            })
            localDispatch({type: 'loadingFalse'})
        }, 2000)
        return () => {
            clearTimeout(search)
        }
    }, [getAvatar])

    return (
        <ListItemAvatar>
            {states.loading ?
                <LoaderInside />
            :
                <>
                    <Avatar
                        className={classes.large}
                        src={states.avatar !== '' ?
                            `${process.env.REACT_APP_URL_API + states.avatar}`
                        :
                            ''
                        }
                    />
                    <ListItemText className={classes.text}>{states.role}</ListItemText>
                </>
            }
        </ListItemAvatar>
    )
}

export default AvatarComp
