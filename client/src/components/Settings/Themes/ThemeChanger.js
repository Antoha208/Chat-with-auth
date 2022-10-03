import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'


import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded'
import { Button } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'


import { Context } from '../context'
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