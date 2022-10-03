import React from 'react'
import { useSelector } from 'react-redux'


import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const AvatarUser = () => {
    const userStore = useSelector(state => state.user.user)

    return (
        <ListItemAvatar>
            <Avatar
                src={ userStore.avatar !== '' ?
                    `${process.env.REACT_APP_URL_API + userStore.avatar}`
                :
                    ''
                }
            />
        </ListItemAvatar>
    )
}

export default AvatarUser