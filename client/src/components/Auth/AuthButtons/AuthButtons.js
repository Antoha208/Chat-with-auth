import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


import styles from './AuthButtons.module.css'
import { CHATS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../../utils/consts'
import { registration, login, addLogInfo } from '../../../http/userApi'
import { changeIsAuth } from '../../../store/authReducer'
import { setUser } from '../../../store/userReducer'
import { catchError } from './ErrorHandler'

const AuthButtons = ({isLogin, states, localDispatch}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const click = async () => {
    localDispatch({type: 'username', payload: ''})
    localDispatch({type: 'password', payload: ''})
    try {
      let userData;
      if (isLogin) {
        userData = await login(states.username, states.password)
        dispatch(setUser(userData))
      } else {
        localDispatch({type: 'passwordConf', payload: ''})
        if (states.password === states.passwordConf) {
          userData = await registration(states.username, states.password)
          dispatch(setUser(userData))
        } else {
          localDispatch({type: 'error'})
        }
      }
      await addLogInfo(userData.iat, userData.exp)
      dispatch(changeIsAuth(true))
      navigate(CHATS_ROUTE)
    } catch (error) {
      if (!states.error) {
        catchError(error, states, t)
      }
    }
  }

  return (
      <div className = { styles.card__buttons }>
        <div className = { styles.card__sign }
          onClick={click}
        >
          {isLogin ? <span>Sign In!</span> : <span>Sign Up!</span>}
        </div>
        {isLogin ? 
          <div className = { styles.card__regWrap }>Need an account?
            <NavLink to = {REGISTRATION_ROUTE}>
              <div className = { styles.card__reg }>
                <span>Sign Up</span>
              </div>
            </NavLink>
          </div>
        :
          <div className = { styles.card__regWrap }>Have an account?  
            <NavLink to = {LOGIN_ROUTE}>
              <div className = { styles.card__reg }>
                <span>Sign In</span>
              </div>
            </NavLink>
          </div>
        }
      </div>
    )
}

export default AuthButtons