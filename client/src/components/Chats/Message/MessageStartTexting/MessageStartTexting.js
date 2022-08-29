import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'


import Button from '@material-ui/core/Button'


import styles from './MessageStartTexting.module.css'


const MessageStartTexting = ({mess, applyToRequest}) => {
    // const userStore = useSelector(state => state.user.user)
    const compStore = useSelector(state => state.companion.companion)
    const { t } = useTranslation()

    return (
        <>
            {mess.username === compStore.username && (
                mess.answer === false ?
                    <div className = {styles.wrapper}>
                        <div className = {styles.message__answerFalse}>{t ('description.MessageConnection1')} {compStore.username} {t ('description.MessageStartTexting1')}
                            <div className = {styles.message__requestCont}>
                                <Button className = {styles.message__requestBtn} onClick={applyToRequest}>{t ('description.MessageDeletingChat7')}</Button>
                            </div>
                        </div>
                    </div>
                :
                    <div className = {styles.wrapper}>
                        <div className = {styles.message__answerTrue}>{t ('description.MessageConnection1')} {compStore.username} {t ('description.MessageStartTexting2')}                       
                            <div className = {styles.message__requestCont}>
                                {/* <Button className = {styles.message__requestBtn} onClick={applyToRequest}>{t ('description.MessageDeletingChat7')}</Button> */}
                            </div>
                        </div>
                    </div>
            )}
        </>        
    )
}

export default MessageStartTexting