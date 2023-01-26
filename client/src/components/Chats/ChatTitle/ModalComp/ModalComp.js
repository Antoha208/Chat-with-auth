import React from 'react'


import Modal from '@mui/material/Modal'
import Avatar from '@mui/material/Avatar'


import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'

const ModalComp = ({chat, avatar, setAvatar, handleClose}) => {
    const classes = useClasses(stylesJS)
    
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
