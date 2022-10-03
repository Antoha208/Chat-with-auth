import React from 'react'
import { useTranslation } from 'react-i18next'


import CHATS from './img/chats.png'
import styles from './EmptyList.module.css'


const EmptyList = () => {
    const { t } = useTranslation()
    return (
        <div className = {styles.chats__wrapper}>
            <img 
                className = {styles.chats} 
                src = {CHATS}
            />
            <div className={styles.chats__text}>{t ('description.ChatListEmpty')}</div>
        </div>
    )
}

export default EmptyList