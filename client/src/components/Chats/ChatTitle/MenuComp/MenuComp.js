import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'


import { Menu } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded'


import styles from './MenuComp.module.css'
import { Context } from '../../context'

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