import React from 'react'
import { useSelector } from 'react-redux'


import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

const AvatarUser = () => {
    const compStore = useSelector(state => state.companion.companion)

    return (
        <ListItemAvatar>
            <Avatar
                src={ compStore.avatar !== '' ?
                    `${process.env.REACT_APP_URL_API + compStore.avatar}`
                :
                    ''
                }
            />
        </ListItemAvatar>
    )
}

export default AvatarUser
