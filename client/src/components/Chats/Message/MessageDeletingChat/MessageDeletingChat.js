import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'


import Button from '@mui/material/Button'


import styles from './MessageDeletingChat.module.css'


const MessageDeletingChat = ({mess, deletingChat}) => {
    const userStore = useSelector(state => state.user.user)
    const compStore = useSelector(state => state.companion.companion)
    const messagesStore = useSelector(state => state.messages.messages)
    const filterChats = messagesStore.filter(el => el.event === 'deleteChat')
    const { t } = useTranslation()

    return (
        <>
            {mess.id === userStore.id ?
                !messagesStore.some(el => el.event === 'deleteChat' && el.answer !== undefined) && ( 
                    <div className = {styles.message__request}>{t ('description.MessageDeletingChat1')} {compStore.username}                       
                        <div className = {styles.message__requestCont}>
                            <Button className = {styles.message__requestBtn} onClick={deletingChat}>{t ('description.MessageRequest3')}</Button>
                        </div>
                    </div>
                )
            :
                mess.answer === 'cancel' ?
                        <div className = {styles.wrapper}>
                            <div className = {styles.message__answerFalse}>{t ('description.MessageConnection1')} {mess.username} {t ('description.MessageRequest8')}                       
                                <div className = {styles.message__requestCont}></div>
                            </div>
                        </div>
                :
                    mess.answer === false ?
                        <div className = {styles.wrapper}>
                            <div className = {styles.message__answerFalse}>{t ('description.MessageDeletingChat4')} {compStore.username} {t ('description.MessageDeletingChat5')}</div>
                        </div>
                    :
                        mess.answer === true ?
                            <div className = {styles.wrapper}>
                                <div className = {styles.message__answerTrue}>{t ('description.MessageDeletingChat4')} {compStore.username} {t ('description.MessageDeletingChat6')}                       
                                    <div className = {styles.message__requestCont}>
                                        <Button className = {styles.message__requestBtn} onClick={deletingChat}>{t ('description.MessageDeletingChat7')}</Button>
                                    </div>
                                </div>
                            </div>
                        :
                            filterChats.every(el => el.answer === undefined) && (
                                <div className = {styles.message__request}>{t ('description.MessageConnection1')} {mess.username} {t ('description.MessageDeletingChat2')}                            
                                    <div>{t ('description.MessageDeletingChat3')}</div>
                                    <div className = {styles.message__requestCont}>
                                        <Button className = {styles.message__requestBtn} onClick={deletingChat}>{t ('description.MessageRequest6')}</Button>
                                        <Button className = {styles.message__requestBtn} onClick={deletingChat}>{t ('description.MessageRequest7')}</Button>
                                    </div>
                                </div>
                            )
            }
        </>     
    )
}

export default MessageDeletingChat
