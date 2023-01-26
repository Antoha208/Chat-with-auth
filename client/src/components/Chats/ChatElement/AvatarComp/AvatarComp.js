import React from 'react'
import { useSelector } from 'react-redux'


import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

const AvatarComp = ({chat}) => {
    const userStore = useSelector(state => state.user.user)

    return (
        <ListItemAvatar>
            <Avatar
                src={chat.avatars.some(el => el !== '' && el !== userStore.avatar) ?
                    `${process.env.REACT_APP_URL_API + chat.avatars.find(el => el !== '' && el !== userStore.avatar)}`
                :
                    ''
                }
            />
        </ListItemAvatar>
    )
}

export default AvatarComp
