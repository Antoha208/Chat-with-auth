import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'


import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import KeyboardRoundedIcon from '@mui/icons-material/KeyboardRounded'


import { Context } from '../context.js'
import styles from './Shortcuts.module.css'


const Shortcuts = () => {
    const { shortcuts } = useContext(Context)
    const { t } = useTranslation()

    const openModal = () => {
        shortcuts()
    }

    return (
        <div className = { styles.mode__container }>
            <div className = { styles.mode }>
                <Button className = 
                    { classnames ({
                        [styles.mode__icon]: true,
                        [styles.selected__mode]: false
                    }) } 
                    onClick = {openModal}>
                        <Tooltip title={t ('description.WhatchAttachmentTooltip')} arrow>
                            <KeyboardRoundedIcon />
                        </Tooltip>
                </Button>
            </div>
        </div>
    )
}

export default Shortcuts
