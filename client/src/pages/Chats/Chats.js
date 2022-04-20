import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Card } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';

import ChatWindow from '../../components/Chats/ChatWindow';
import AvatarComponent from '../../components/NavBar/Avatar/Avatar.js';
//import ChatList from "../../components/Chats/ChatList";
import styles from './Chats.module.css'
import useStyles from './makeStyles'
import logo from '../../components/NavBar/NavBar/img/logo.png'
import { PROFILE_ROUTE, SETTINGS_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import { changeIsAuth } from "../../store/authReducer";
import { setUser } from "../../store/userReducer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function tabProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Chats() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const open = Boolean(anchorEl);
  const username = useSelector(state => state.user.user.username)
  const roles = useSelector(state => state.user.user.roles)
  const auth = useSelector(state => state.isAuth.isAuth)

  const checkRole = roles.includes('Admin')

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
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

  const logout = () => {
    dispatch(setUser(null))
    dispatch(changeIsAuth(false))
    localStorage.clear()
    navigate(LOGIN_ROUTE)
  }
  
  return (
    <Card className={styles.card}>
      <div className={styles.upBar}>
        <AppBar position="static" color='transparent'>
          <Toolbar className = {classes.toolbar}>
            <div>
              <img src = { logo } alt = 'logo' className = { styles.logo } />
            </div>
            <Typography  variant="h6" className={classes.title}>
              <TabPanel className={classes.selectedChat} value={value} index={0}>
                Item One
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={3}>
                Item Four
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={4}>
                Item Five
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={5}>
                Item Six
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={6}>
                Item Seven
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={7}>
                Item 8
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={8}>
                Item 9
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={9}>
                Item 10
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={10}>
                Item 11
              </TabPanel>
              <TabPanel className={classes.selectedChat} value={value} index={11}>
                Item 12
              </TabPanel>
            </Typography>
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
      <div className = {styles.content}>
        <div className = { classes.sideBar }>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search"
            />
            <IconButton className={classes.iconButton}>
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
          </Paper>
          <Tabs
            orientation="vertical"
            indicatorColor="primary"
            variant="scrollable"
            value={value}
            onChange={handleChangeTab}
            className={styles.tabs}
          >
            <Tab label="Item One" {...tabProps(0)} />
            <Tab label="Item Two" {...tabProps(1)} />
            <Tab label="Item Three" {...tabProps(2)} />
            <Tab label="Item Four" {...tabProps(3)} />
            <Tab label="Item Five" {...tabProps(4)} />
            <Tab label="Item Six" {...tabProps(5)} />
            <Tab label="Item Seven" {...tabProps(6)} />
            <Tab label="Item 8" {...tabProps(7)} />
            <Tab label="Item 9" {...tabProps(8)} />
            <Tab label="Item 10" {...tabProps(9)} />
            <Tab label="Item 11" {...tabProps(10)} />
            <Tab label="Item 12" {...tabProps(11)} />
          </Tabs>
        </div>
        <div className = {styles.onechat}>
          <ChatWindow />
        </div>
      </div>
    </Card>
  );
}


//export default Chats;
