import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'


import Button from '@mui/material/Button'


import styles from './MessageRequest.module.css'


const MessageRequest = ({mess, applyToRequest}) => {
    const userStore = useSelector(state => state.user.user)
    const compStore = useSelector(state => state.companion.companion)
    const messagesStore = useSelector(state => state.messages.messages)
    const { t } = useTranslation()

    return (
        <>
            {mess.id === userStore.id ?
                !messagesStore.some(el => el.event === 'request' && el.answer !== undefined && el.answer !== 'cancel') && (
                    <div className = {styles.message__request}>{t ('description.MessageRequest1')} {compStore.username} {t ('description.MessageRequest2')} '{mess.message}'                       
                        <div className = {styles.message__requestCont}>
                            <Button className = {styles.message__requestBtn} onClick={applyToRequest}>{t ('description.MessageRequest3')}</Button>
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
                    mess.answer === true ?
                        <div className = {styles.wrapper}>
                            <div className = {styles.message__answerTrue}>{t ('description.MessageDeletingChat4')} {compStore.username} {t ('description.MessageStartTexting2')}                       
                                <div className = {styles.message__requestCont}></div>
                            </div>
                        </div>
                    :
                        mess.answer === false ?
                            <div className = {styles.wrapper}>
                                <div className = {styles.message__answerFalse}>{t ('description.MessageConnection1')} {compStore.username} {t ('description.MessageStartTexting1')}
                                    <div className = {styles.message__requestCont}>
                                        <Button className = {styles.message__requestBtn} onClick={applyToRequest}>{t ('description.MessageDeletingChat7')}</Button>
                                    </div>
                                </div>
                            </div>
                        :
                            messagesStore.every(el => el.answer === undefined) && (
                                <div className = {styles.message__request}>{t ('description.MessageConnection1')} {mess.username} {t ('description.MessageRequest4')} '{mess.message}'                            
                                    <div>{t ('description.MessageRequest5')}</div>
                                    <div className = {styles.message__requestCont}>
                                        <Button className = {styles.message__requestBtn} onClick={applyToRequest}>{t ('description.MessageRequest6')}</Button>
                                        <Button className = {styles.message__requestBtn} onClick={applyToRequest}>{t ('description.MessageRequest7')}</Button>
                                    </div>
                                </div>
                            )
            }
        </>     
    )
}

export default MessageRequest
