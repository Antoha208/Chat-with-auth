import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'


import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded'


import styles from './MenuComp.module.css'
import { Context } from '../../context.js'

const MenuComp = ({deleteChat, setAvatar, handleClose}) => {
    const {states, open} = useContext(Context)
    const { t } = useTranslation()

    return (
        <Menu
            anchorEl={states.anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
        >
            <Tooltip title={t ('description.ChatTitleZoomTooltip')} arrow>
                <MenuItem onClick={() => setAvatar(true)}><ZoomInRoundedIcon className={styles.icon} /></MenuItem>
            </Tooltip>
            <Tooltip title={t ('description.ChatTitleDeleteTooltip')} arrow>
                <MenuItem onClick={deleteChat}><DeleteForeverRoundedIcon className={styles.icon} /></MenuItem>
            </Tooltip>
            <Tooltip title={t ('description.ChatListCloseTooltip')} arrow>
                <MenuItem onClick={handleClose}><ClearRoundedIcon className={styles.icon} /></MenuItem>
            </Tooltip>
        </Menu>
    )
}

export default MenuComp
