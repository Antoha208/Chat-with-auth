import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


import Tooltip from '@material-ui/core/Tooltip'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded'


import useStyles from './makeStyles'
import styles from './ShowingList.module.css'
import { Context } from '../../context'

const ShowingList = ({addChatWith, deleteAll}) => {
    const { closeBar, states, localDispatch } = useContext(Context)
    const { t } = useTranslation()
    const classes = useStyles()
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
                <SearchIcon className={styles.icon__disabled} />
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