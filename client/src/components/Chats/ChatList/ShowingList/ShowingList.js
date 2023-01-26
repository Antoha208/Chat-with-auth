import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded'
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded'


import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'
import styles from './ShowingList.module.css'
import { Context } from '../../context.js'

const ShowingList = ({addChatWith, deleteAll}) => {
    const { closeBar, states, localDispatch } = useContext(Context)
    const { t } = useTranslation()
    const classes = useClasses(stylesJS)
    const chatsStore = useSelector(state => state.chats.chats)

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={t ('description.ChatListSearch')}
                value={states.search}
                onChange={(e) => localDispatch({type: 'search', payload: e.target.value})}
            />
            <IconButton disabled className={classes.iconButton}>
                <SearchRoundedIcon className={styles.icon__disabled} />
            </IconButton>
            {!states.menuOpen ?
                <Tooltip title={t ('description.NavBarMenuTooltip')} arrow>
                    <IconButton className={classes.iconButton} onMouseEnter={() => localDispatch({type: 'menuOpen'})}>
                        <MenuOpenRoundedIcon className={styles.icon} />
                    </IconButton>
                </Tooltip>
            :
                <div onMouseLeave={() => localDispatch({type: 'menuOpen'})}>
                    {chatsStore.length !== 0 && (
                        <Tooltip title={t ('description.ChatListDeleteAllTooltip')} arrow>
                            <IconButton className={classes.iconButton} onClick={deleteAll} >
                                <RemoveCircleOutlineRoundedIcon className={styles.icon} />
                            </IconButton>
                        </Tooltip>
                    )}
                    {!states.plus ?
                        <Tooltip title={t ('description.ChatListAddTooltip')} arrow>
                            <IconButton className={classes.iconButton} onClick={addChatWith}>
                                <AddRoundedIcon className={styles.icon} />
                            </IconButton>
                        </Tooltip>
                    :
                        <Tooltip title={t ('description.ChatListCloseTooltip')} arrow>
                            <IconButton className={classes.iconButton} onClick={closeBar}>
                                <ClearRoundedIcon className={styles.icon} />
                            </IconButton>
                        </Tooltip>
                    }
                </div>
            }
            <Divider className={classes.divider} orientation="vertical" />
        </Paper>
    )
}

export default ShowingList
