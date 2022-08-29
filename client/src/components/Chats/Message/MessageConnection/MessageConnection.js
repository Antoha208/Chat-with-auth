import React from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'


import styles from './MessageConnection.module.css'


const MessageConnection = ({mess}) => {
    const { t } = useTranslation()

    return (
        <>
            <div className = {styles.message__connect}>{t ('description.MessageConnection1')} {mess.username} {t ('description.MessageConnection2')} {moment(mess.key).format('hh:mm A DD/MM/YYYY')}</div>
        </>     
    )
}

export default MessageConnection