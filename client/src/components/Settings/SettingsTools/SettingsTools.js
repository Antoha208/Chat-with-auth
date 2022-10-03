import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import { Card, IconButton } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import EditRoundedIcon from '@material-ui/icons/EditRounded'


import RootModal from '../../Settings/Modal/RootModal'
import ThemeChanger from '../../Settings/Themes/ThemeChanger'
import LanguageChanger from '../../Settings/Language/LanguageChanger'
import Shortcuts from '../../Settings/Shortcuts/Shortcuts'
import { Context } from '../context'
import styles from './SettingsTools.module.css'
import useStyles from './makeStyles.js'

const SettingsTools = () => {
    const { states, localDispatch } = useContext(Context)
    const classes = useStyles()
    const { t } = useTranslation()
    const userStore = useSelector(state => state.user.user)

    const changeDataUsername = (e) => {
        localDispatch({type: 'checkModal'})
        const target = e.target.id
        console.log(target)
        localDispatch({type: 'selected', payload: target})
      }
    
      const changeDataPassword = (e) => {
        localDispatch({type: 'checkModal'})
        const target = e.target.id
        console.log(target)
        localDispatch({type: 'selected', payload: target})
      }

  return (
        <Card className={classes.infoContainer}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>{t ('description.SettingsUsername')} {userStore.username}
                        <IconButton onClick={changeDataUsername} id='username'>
                            <Tooltip title={t ('description.MessageEditTooltip')} arrow>
                                <EditRoundedIcon className={styles.icon} id='username' />
                            </Tooltip>
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>{t ('description.SettingsPassword')}
                        <IconButton onClick={changeDataPassword} id='password'>
                            <Tooltip title={t ('description.MessageEditTooltip')} arrow>
                                <EditRoundedIcon className={styles.icon} id='password' />
                            </Tooltip>
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>{t ('description.SettingsTheme')}
                        <ThemeChanger />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>{t ('description.SettingsLanguage')}
                        <LanguageChanger />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>{t ('description.SettingsShortcuts')}
                        <Shortcuts />
                    </Paper>
                </Grid>
            </Grid>
            {states.openCheckModal || states.openAcceptModal  || states.openShortcutsModal ?
                <RootModal />
            :
                ''
            }
        </Card>
    )
}

export default SettingsTools
