import React from 'react'

import Modal from '@material-ui/core/Modal'
import Avatar from '@material-ui/core/Avatar'


import useStyles from './makeStyles'

const ModalComp = ({chat, avatar, setAvatar, handleClose}) => {
    const classes = useStyles()
    
    return (
        <Modal
            open={avatar}
            onClose={() => {setAvatar(false); handleClose()}}
        >
            <Avatar className={classes.paper}
                src={chat.avatars.length !== 0 ?
                    `${process.env.REACT_APP_URL_API + chat.avatars.find((el, index) => index !== 0)}`
                :
                    ''
                }
            />
        </Modal>
    )
}

export default ModalComp