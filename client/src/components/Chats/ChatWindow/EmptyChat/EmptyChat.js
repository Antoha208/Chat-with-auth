import React from 'react'
import { useTranslation } from 'react-i18next'


import EMPTYCHAT from './img/EmptyChat.png'
import styles from './EmptyChat.module.css'


const EmptyChat = () => {
    const { t } = useTranslation()
    return (
        <div className = {styles.img__wrapper}>
            <img 
                alt = ''
                src = {EMPTYCHAT}
                className = { styles.img }
            />
            <div className = {styles.img__text}>{t ('description.ChatWindowEmpty')}</div>
        </div>
    )
}

export default EmptyChat
