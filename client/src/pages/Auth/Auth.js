import React, { useReducer } from 'react'
import { useLocation } from 'react-router-dom'


import styles from './Auth.module.css'
import localReducer from './localReducer.js'
import { LOGIN_ROUTE } from '../../utils/consts.js'
import AuthData from '../../components/Auth/AuthData/AuthData.js'
import BcgElements from '../../components/Auth/Bcg/BcgElements.js'
import AuthButtons from '../../components/Auth/AuthButtons/AuthButtons.js'

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [states, localDispatch] = useReducer(localReducer, {username: '', password: '', passwordConf: '', visible: true, error: false})

  return (
    <div className = { styles.wrapper }>
      <div className = { styles.container }>
        <BcgElements />
        <h2 className = { styles.title }>{isLogin ? <div>SIGH IN</div> : <div>SIGN UP</div>}</h2>
        <div className = { styles.card }>
          <AuthData
            isLogin={isLogin}
            states={states}
            localDispatch={localDispatch}
          />
          <AuthButtons 
            isLogin={isLogin}
            states={states}
            localDispatch={localDispatch}
          />
        </div>
        <div className = {styles.table}></div>
      </div>
    </div>
  )
}

export default Auth
