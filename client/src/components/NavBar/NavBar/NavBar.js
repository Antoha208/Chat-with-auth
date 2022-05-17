import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import useStyles from './makeStyles'
import styles from './NavBar.module.css'
import AvatarComponent from '../Avatar/Avatar'
import logo from './img/logo.png';
import { CHATS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE } from '../../../utils/consts'
import { resetApp } from '../../../store/index'
import { removeLogInfo } from '../../../http/userApi'


const NavBar = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const open = Boolean(anchorEl);
  const username = useSelector(state => state.user.user.username)
  const roles = useSelector(state => state.user.user.roles)
  const auth = useSelector(state => state.isAuth.isAuth)

  const checkRole = roles.includes('Admin')

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleChats = () => {
    setAnchorEl(null);
    navigate(CHATS_ROUTE)
  }

  const handleProfile = () => {
    setAnchorEl(null);
    navigate(PROFILE_ROUTE)
  }

  const handleSettings = () => {
    setAnchorEl(null);
    navigate(SETTINGS_ROUTE)
  }

  const handleAdmin = () => {
    setAnchorEl(null);
    navigate(ADMIN_ROUTE)
  }

  const logout = async () => {
    await removeLogInfo()
    dispatch(resetApp())
    localStorage.clear()
    navigate(LOGIN_ROUTE)
  }

  return (
    <div className={classes.upBar}>
      <AppBar position="static" color='transparent'>
        <Toolbar className = {styles.toolbar}>
          <div>
            <img  src = { logo } onClick={handleChats} alt = 'logo' className = { styles.logo } />
          </div>
          {(
            <div className = {styles.username__container}>
              <div className = {styles.username}>
                {username || 'username'}
              </div>
              <IconButton
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AvatarComponent />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleChats}>{t ('description.NavBarChats')}</MenuItem>
                <MenuItem onClick={handleProfile}>{t ('description.NavBarProfile')}</MenuItem>
                <MenuItem onClick={handleSettings}>{t ('description.NavBarSettings')}</MenuItem>
                {auth ?
                  <MenuItem onClick={logout}>{t ('description.NavBarLogout')}</MenuItem>
                :
                  <MenuItem />
                }
                {checkRole ?
                  <MenuItem onClick={handleAdmin}>{t ('description.NavBarAdmin')}</MenuItem>
                :
                  ''
                }
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )

}


export default NavBar
