import React, { useContext } from "react"
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'


import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'


import { Context } from '../context.js'
import styles from './LanguageChanger.module.css'


const LanguageChanger = () => {
    const { changeThemeOrLanguage, localDispatch } = useContext(Context)
    const { t } = useTranslation()

    const openModal = (e) => {
        changeThemeOrLanguage()
        const target = e.target.id
        console.log(target)
        localDispatch({type: 'selected', payload: target})
    }

    return (
        <div className = { styles.mode__container }>
            <div className = { styles.mode }>
                <Button className = 
                    { classnames ({
                        [styles.mode__icon]: true,
                        [styles.selected__mode]: false
                    }) } 
                    onClick = {openModal}
                    id='lang'
                >
                    <Tooltip title={t ('description.MessageEditTooltip')} arrow>
                        <LanguageRoundedIcon id='lang' />
                    </Tooltip>
                </Button>
            </div>
        </div>
    )
}

export default LanguageChanger
