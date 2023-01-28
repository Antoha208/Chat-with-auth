import React, { useCallback, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


import Card from '@mui/material/Card'


import styles from './Settings.module.css'
import stylesJS from './makeStyles.js'
import useClasses from '../../CustomHooks/useClasses.js'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'
import SettingsPic from '../../components/Settings/Picture/SettingsPic.js'
import SettingsTools from '../../components/Settings/SettingsTools/SettingsTools.js'
import { Context } from '../../components/Settings/context.js'
import localReducer from './localReducer.js'

const Settings = () => {
  const classes = useClasses(stylesJS)
  const { t } = useTranslation()
  const userStore = useSelector(state => state.user.user)
  const [states, localDispatch] = useReducer(localReducer, {openCheckModal: false, openAcceptModal: false, openShortcutsModal: false, selected: ''})

  const changeThemeOrLanguage = useCallback((e) => {
    localDispatch({type: 'acceptModal'})
  }, [states.openAcceptModal])

  const acceptTheme = useCallback(() => {
    alert(`${t ('description.SettingsAlertTheme')}`)
  }, [userStore.theme])

  const acceptLanguage = useCallback(() => {
    alert(`${t ('description.SettingsAlertLang')}`)
  }, [userStore.language])
  
  const shortcuts = useCallback(() => {
    localDispatch({type: 'shortcutsModal'})
  }, [states.openShortcutsModal])

  const closeCheckBar = useCallback(() => {
    localDispatch({type: 'checkModal'})
  }, [states.openCheckModal])

  const closeAcceptBar = useCallback(() => {
    localDispatch({type: 'acceptModal'})
  }, [states.openAcceptModal])

  const closeShortcuts = useCallback(() => {
    localDispatch({type: 'shortcutsModal'})
  }, [states.openShortcutsModal])

  return (
    <Context.Provider value = {{
      states, localDispatch, 
      changeThemeOrLanguage, acceptTheme, acceptLanguage, shortcuts,
      closeCheckBar, closeAcceptBar, closeShortcuts 
    }}
    >
      <Card className={styles.container}>
        <NavBar />
        <div className={styles.card}>
          <Card className={classes.avatarContainer}>
            <SettingsPic />
          </Card>
          <SettingsTools />
        </div>
      </Card>
    </Context.Provider>
  )
}

export default Settings
