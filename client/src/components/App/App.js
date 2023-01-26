import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { ThemeProvider } from '@mui/material/styles'


import AppRouter from './AppRouter.js'
import styles from './App.module.css'
import { changeIsAuth } from '../../store/authReducer.js'
import { check } from '../../http/userApi.js'
import Loader from './Loader.js'
import { themeDark, themeLight } from '../Settings/Themes/Themes.js'

const App = () => {
  const dispatch = useDispatch()
  const userStore = useSelector(state => state.user.user)
  const [loading, setLoading] = useState(true)

  const checking = useCallback(() => {
    check().then(data => {
      dispatch(changeIsAuth(true))
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    checking()
  }, [checking])
  
  if (loading) {
    return (
      <div className={styles.section}>
        <Loader />
      </div>
    )
  }

  return (
    <ThemeProvider theme = {userStore.theme.includes('Dark') ? themeLight : themeDark}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  )

}

export default App
