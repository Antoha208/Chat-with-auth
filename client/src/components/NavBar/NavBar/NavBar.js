import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'


import useStyles from './makeStyles'
import styles from './NavBar.module.css'
import AvatarComponent from '../AvatarComponent/AvatarComponent'
import MenuComp from '../MenuComp/MenuComp'
import logo from './img/logo.png'
import { ContextMain } from '../../../pages/Chats/contextMain'
import { LOGIN_ROUTE, CHATS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE, ADMIN_ROUTE } from '../../../utils/consts'
import { disconnect } from '../../../WebSocket/webSocket'
import { resetApp } from '../../../store/index'
import { removeLogInfo } from '../../../http/userApi'

const NavBar = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { setConnected } = useContext(ContextMain)
  const userStore = useSelector(state => state.user.user)
  const compStore = useSelector(state => state.companion.companion)
  const messagesStore = useSelector(state => state.messages.messages) 

  useEffect(() => {
      window.addEventListener('unload', handleClosing)
    return () => {
      window.removeEventListener('unload', handleClosing)
    }
  })

  const handleClosing = () => {
    navigateTo('logout')
  }

  const handleMenu = (event) => {
    // if (compStore.id !== null) {
    //   alert(`${t ('description.NavBarAlert')}`)
    // } else {
      setAnchorEl(event.currentTarget)
    // }
  }

  const navigateTo = useCallback(async (page) => {
    setAnchorEl(null)
    switch (page) {
      case 'chats':
        navigate(CHATS_ROUTE)
        break;
      case 'profile':
        navigate(PROFILE_ROUTE)
        break;
      case 'settings':
        navigate(SETTINGS_ROUTE)
        break;
      case 'admin':
        navigate(ADMIN_ROUTE)
        break;
      case 'logout':
        await removeLogInfo()
        disconnect(dispatch, setConnected, userStore, compStore, messagesStore, t)
        dispatch(resetApp())
        window.localStorage.clear()
        navigate(LOGIN_ROUTE)
        break;
      default:
        break;
    }
  }, [anchorEl])

  return (
    <div className={classes.upBar}>
      <AppBar position="static" color='transparent'>
        <Toolbar className = {styles.toolbar}>
          <div>
            <img  src = { logo } alt = 'logo' className = { styles.logo }
              onClick={() => navigateTo('chats')}
            />
          </div>
          {(
            <div className = {styles.username__container}>
              <div className = {styles.username}>
                {userStore.username || 'username'}
              </div>
              <Tooltip title={t ('description.NavBarMenuTooltip')} arrow>
                <IconButton
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AvatarComponent />
                </IconButton>
              </Tooltip>
              <MenuComp
                anchorEl={anchorEl}
                navigateTo={navigateTo}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar