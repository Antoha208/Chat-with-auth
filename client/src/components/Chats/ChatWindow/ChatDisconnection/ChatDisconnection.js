import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'


import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'


import styles from './ChatDisconnection.module.css'
import { ContextMain } from '../../../../pages/Chats/contextMain'
import { disconnect } from '../../../../WebSocket/webSocket'

const ChatDisconnection = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const compStore = useSelector(state => state.companion.companion)
    const userStore = useSelector(state => state.user.user)
    const messagesStore = useSelector(state => state.messages.messages)
    const { setConnected } = useContext(ContextMain)

    return (
        <div className = {styles.sample}>
            <Tooltip title={t ('description.ChatWindowDisconnectTooltip')} arrow>
                <Button onClick={() => disconnect(dispatch, setConnected, userStore, compStore, messagesStore, t)}>
                    <ClearRoundedIcon className={styles.icon} />
                    <div>{t ('description.ChatWindowFinishConv')}</div>
                </Button>
            </Tooltip>
        </div>
    )
}

export default ChatDisconnection