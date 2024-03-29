import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import EditRoundedIcon from '@mui/icons-material/EditRounded'


import RootModal from '../../Settings/Modal/RootModal.js'
import ThemeChanger from '../../Settings/Themes/ThemeChanger.js'
import LanguageChanger from '../../Settings/Language/LanguageChanger.js'
import Shortcuts from '../../Settings/Shortcuts/Shortcuts.js'
import { Context } from '../context.js'
import styles from './SettingsTools.module.css'
import stylesJS from './makeStyles.js'
import useClasses from '../../../CustomHooks/useClasses.js'

const SettingsTools = () => {
    const { states, localDispatch } = useContext(Context)
    const classes = useClasses(stylesJS)
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
