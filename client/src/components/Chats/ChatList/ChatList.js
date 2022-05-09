import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';


import useStyles from './ChatListMakeStyles';
import styles from './ChatList.module.css'
import { getUsers } from "../../../http/userApi";
import { resetAllUsers, setAllUsers } from "../../../store/usersListReducer";
import ChatElement from '../ChatElement/ChatElement'
import SelectCompanion from "../SelectCompanion/SelectCompanion";
import { Context } from '../context'


const ChatList = () => {
    const dispatch = useDispatch()
    const userStore = useSelector(state => state.user.user)
    const allUsers = useSelector(state => state.users.users)
    const selectedUser = useSelector(state => state.companion.companion)
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const [search, setSearch] = useState('')
    const [plus, setPlus] = useState(false)

    useEffect( () => {
      getUsers().then(data => {
        console.log(data)
        dispatch(setAllUsers(data))
      })

      
    // {
    //     const names = data.map(el => el.username)
    //     const check = names.some(user => allUsers.includes(user))
    //     console.log(check)
    //     if (!check) {
    //       dispatch(setAllUsers(data))
    //     }
    //   }) 
    }, [])

    const addChatWith = async () => {
      try {
        let users;
          users = await getUsers()
          const usersDB = users.map(user => user.username)
          const storeUsers = allUsers.map(user => user.username)
          const matchUsers = storeUsers.some(user => user === usersDB.reduce(element => element))
  
          if (matchUsers) {
            setPlus(true)
          } else {
            dispatch(setAllUsers(users))
            setPlus(true)
          }

      } catch (error) {
        alert(error)
      }
    }

    const closeBar = () => {
      setPlus(false)
      // dispatch(resetAllUsers()) // в дальнейшем убрать, чтобы сохранять весь массив чатов в сторе
    }

    const filterUsers = allUsers.filter(user => {
        return user.username.toLowerCase().includes(search.toLowerCase())
      })

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
      }

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
      
      function tabProps(index) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
      }

  return (
      <Context.Provider value = {{
        closeBar
      }}
      >
        <div className = { classes.sideBar }>
          <Toolbar className = {classes.toolbar}>
            <Typography  variant="h6" className={classes.title}>
                {filterUsers.map((user, index) => {
                  return (
                    <TabPanel key={index} value={value} index={filterUsers.indexOf(user)}>
                        <ChatElement />
                    </TabPanel>
                  )
                 })}
            </Typography>
          </Toolbar>  
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton disabled className={classes.iconButton}>
              <SearchIcon />
            </IconButton>
            {!plus ?
              <IconButton className={classes.iconButton} onClick={addChatWith}>
                <AddRoundedIcon />
              </IconButton>
            :
              <IconButton className={classes.iconButton} onClick={closeBar}>
                <ClearRoundedIcon />
              </IconButton>
            }
            
            <Divider className={classes.divider} orientation="vertical" />
          </Paper>
          {plus ?
            <SelectCompanion />
          :
            <div className={classes.rootTabs}>
              <Tabs
                orientation="vertical"
                indicatorColor="primary"
                variant="scrollable"
                value={value}
                onChange={handleChangeTab}
                className={classes.tabs}
              >
                {filterUsers.map((user, index) => {
                    return (
                      <Tab 
                        label={<ChatElement />} 
                        {...tabProps(filterUsers.indexOf(user))} 
                        className={classes.listItem} 
                        key={index}>
                      </Tab>    
                    )
                })}
              </Tabs>
            </div>       
          } 
        </div>
      </Context.Provider>
    )

}


export default ChatList