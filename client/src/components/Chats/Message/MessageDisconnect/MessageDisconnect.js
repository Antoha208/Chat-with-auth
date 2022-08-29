import React from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'


import styles from './MessageDisconnect.module.css'


const MessageDisconnect = ({mess}) => {
    const { t } = useTranslation()

    return (
        <>
            <div className = {styles.message__disconnect}>{t ('description.MessageConnection1')} {mess.username} {t ('description.MessageDisconnect1')} {moment(mess.key).format('hh:mm A DD/MM/YYYY')}</div>
        </>     
    )
}

export default MessageDisconnect