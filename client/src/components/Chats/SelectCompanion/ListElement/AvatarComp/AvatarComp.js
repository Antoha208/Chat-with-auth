import React from 'react'


import Avatar from '@material-ui/core/Avatar'

const AvatarComp = ({user}) => {
    return (
        <>
            <Avatar
                src={ user.avatar !== '' ?
                    `${process.env.REACT_APP_URL_API + user.avatar}`
                :
                    ''
                }
            />
        </>
    )
}

export default AvatarComp