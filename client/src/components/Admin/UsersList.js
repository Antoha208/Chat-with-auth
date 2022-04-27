import React, { useState } from 'react';
import { useSelector } from "react-redux";
import moment from 'moment';

import useStyles from './makeStylesUsersList'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import AvatarComponent from '../NavBar/Avatar/Avatar'
import styles from './UsersList.module.css'

const UsersList = () => {

    const classes = useStyles();
    const userStore = useSelector(state => state.user.user)
    const allUsers = useSelector(state => state.users.users)
    const [checked, setChecked] = useState(false)

    const timestampIat = moment.unix(userStore.iat).format("hh:mm:ss DD.MM.YYYY")
    const timestampExp = moment.unix(userStore.exp).format("hh:mm:ss DD.MM.YYYY")
    const regDate = moment(userStore.registrationDate).format('llll')

    const chooseUser = () => {
      setChecked(!checked)
    }

    return (
        <List dense className={classes.root}>
          <Paper component="form" className={classes.inputWrap}>
            <InputBase
              className={classes.input}
              placeholder="Search"
            />
            <IconButton className={classes.iconButton}>
              <SearchIcon />
            </IconButton>
          </Paper>
            {allUsers.map(user => {
                return (
                  <ListItem className={classes.listItem} key={userStore.username} style={{alignItems: 'flex-start'}} /*button*/>
                    <div className = {styles.user__basicInfo}>
                      <ListItemAvatar>
                      <AvatarComponent
                          // alt={`Avatar n°${value + 1}`}
                          // src={`/static/images/avatar/${value + 1}.jpg`}
                      />
                      </ListItemAvatar>
                      <ListItemText>{userStore.username}</ListItemText>
                      <ListItemSecondaryAction>
                      <Checkbox
                          value = {checked}
                          onClick = {chooseUser}
                          // edge="end"
                          // onChange={handleToggle(value)}
                          // checked={checked.indexOf(value) !== -1}
                          // inputProps={{ 'aria-labelledby': labelId }}
                      />
                      </ListItemSecondaryAction>
                    </div>
                    <div className = {styles.user__info}>
                      <div>{'ID :  '}{userStore._id}</div>
                      <div>{'ROLES :  '}{userStore.roles}</div>
                      <div>{'AVATAR :  '}{userStore.avatar}</div>
                      <div>{'LOGIN TIME :  '}{timestampIat}</div>
                      <div>{'TOKEN EXP. :  '}{timestampExp}</div>
                      <div>{'REGISTRATION :  '}{regDate}</div>
                    </div>
                  </ListItem>
                );
            })}
            <Paper className={classes.paperButton}>
              <Button>Delete users</Button>
            </Paper>
        </List>
    );
}

export default UsersList