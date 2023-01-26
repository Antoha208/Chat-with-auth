import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'


import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded'


import { Context } from '../context.js'
import styles from './ThemeChanger.module.css'


const ThemeChanger = () => {
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
                <Button className ={styles.mode__icon} 
                    onClick = {openModal}
                    id='theme'
                >
                    <Tooltip title={t ('description.MessageEditTooltip')} arrow>
                        <Brightness4RoundedIcon id='theme' />
                    </Tooltip>
                </Button>
            </div>
        </div>
    )
}

export default ThemeChanger
