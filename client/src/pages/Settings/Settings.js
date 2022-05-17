import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'


import { Card, IconButton } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import EditRoundedIcon from '@material-ui/icons/EditRounded'


import styles from './Settings.module.css'
import useStyles from './makeStyles'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import SettingsPic from '../../components/Settings/Picture/SettingsPic'
import RootModal from '../../components/Settings/Modal/RootModal'
import ThemeChanger from '../../components/Settings/Themes/ThemeChanger'
import LanguageChanger from '../../components/Settings/Language/LanguageChanger'
import i18n from "../../components/Settings/Language/i18n"
import Shortcuts from '../../components/Settings/Shortcuts/Shortcuts'
import { Context } from '../../components/Settings/context'


const Settings = () => {

  const userStore = useSelector(state => state.user.user)

  const classes = useStyles()
  const { t } = useTranslation()
  const [openCheckModal, setOpenCheckModal] = useState(false)
  const [openAcceptModal, setOpenAcceptModal] = useState(false)
  const [openShortcutsModal, setOpenShortcutsModal] = useState(false)
  const [selected, setSelected] = useState('')
  const [darkTheme, setDarkTheme] = useState(userStore.theme)

  
  const changeDataUsername = (e) => {
    setOpenCheckModal(true)
    const target = e.target.id
    console.log(target)
    setSelected(target)
  }

  const changeDataPassword = (e) => {
    setOpenCheckModal(true)
    const target = e.target.id
    console.log(target)
    setSelected(target)
  }

  const changeThemeOrLanguage = (e) => {
    setOpenAcceptModal(true)
  }

  const acceptTheme = () => {

    if (darkTheme === 'Light') {
        setDarkTheme('Dark')
    } else {
        setDarkTheme('Light')
    }

    alert('Тема изменена')
    
    setOpenAcceptModal(false)
  }

  const acceptLanguage = () => {
    if (userStore.language.includes('English')) {
      i18n.changeLanguage('ru')
    } else if (userStore.language.includes('Russian')) {
      i18n.changeLanguage('en')
    }
  }
  
  const shortcuts = () => {
    setOpenShortcutsModal(true)
  }

  const closeCheckBar = () => {
    setOpenCheckModal(false)
  }

  const closeAcceptBar = () => {
    setOpenAcceptModal(false)
  }

  const closeShortcuts = () => {
    setOpenShortcutsModal(false)
  }

  
  return (
    <Context.Provider value = {{
      openCheckModal, selected, openAcceptModal, darkTheme, openShortcutsModal, setSelected, changeThemeOrLanguage, acceptTheme, acceptLanguage, shortcuts, closeCheckBar, closeAcceptBar, closeShortcuts 
    }}
    >
      <Card className={styles.container}>
        <NavBar />
        <div className={styles.card}>
          <Card className={classes.avatarContainer}>
            <SettingsPic />
          </Card>
          <Card className={classes.infoContainer}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>{t ('description.SettingsUsername')} {userStore.username}
                  <IconButton onClick={changeDataUsername} id='username'>
                    <EditRoundedIcon className={styles.icon} id='username' />
                  </IconButton>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>{t ('description.SettingsPassword')}
                  <IconButton onClick={changeDataPassword} id='password'>
                    <EditRoundedIcon className={styles.icon} id='password' />
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
            {openCheckModal || openAcceptModal  || openShortcutsModal ?
              <RootModal />
            :
              ''
            }
          </Card>
        </div>
      </Card>
    </Context.Provider>
  )
}

export default Settings
