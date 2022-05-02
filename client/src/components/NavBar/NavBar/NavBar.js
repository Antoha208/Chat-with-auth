import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import useStyles from './makeStyles';
import styles from './NavBar.module.css'
import AvatarComponent from '../Avatar/Avatar';
import logo from './img/logo.png';
import { CHATS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE } from '../../../utils/consts';
import { changeIsAuth } from '../../../store/authReducer';
import { setUser } from '../../../store/userReducer';
import { removeLogInfo } from '../../../http/userApi'

const NavBar = () => {

  const classes = useStyles()
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
    dispatch(setUser(null))
    dispatch(changeIsAuth(false))
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
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AvatarComponent />
              </IconButton>
              <Menu
                id="menu-appbar"
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
                <MenuItem onClick={handleChats}>Chats</MenuItem>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleSettings}>Settings</MenuItem>
                {auth ?
                  <MenuItem onClick={logout}>Log out</MenuItem>
                :
                  <MenuItem />
                }
                {checkRole ?
                  <MenuItem onClick={handleAdmin}>Admin Pannel</MenuItem>
                :
                  <MenuItem />
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
