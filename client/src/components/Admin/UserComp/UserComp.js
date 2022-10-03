import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'


import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'


import useStyles from './makeStyles'
import styles from './UserComp.module.css'

const UserComp = ({user, index, states, localDispatch}) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const chooseUser = (user) => () => {
    const currentIndex = states.checked.indexOf(user)
    const newChecked = [...states.checked]

    if (newChecked.length < 2) {

      if (currentIndex === -1) {
        newChecked.push(user)
      } else {
        newChecked.splice(currentIndex, 1)
      }

      if (states.count !== '') {
        localDispatch({type: 'count', payload: ''})
      } else {
        localDispatch({type: 'count', payload: newChecked[1].username})
      }

      localDispatch({type: 'checked', payload: newChecked})
    } 
  }
    
  return (
    <ListItem className={classes.listItem} key={index} style={{alignItems: 'flex-start'}}>
      <div className = {styles.user__basicInfo}>
        <ListItemAvatar>
          <Avatar
            src={ user.avatar !== '' ?
              `${process.env.REACT_APP_URL_API + user.avatar}`
            :
              ''
            }
          />
        </ListItemAvatar>
        <ListItemText>{user.username}</ListItemText>
        <ListItemSecondaryAction>
          <Tooltip title={t ('description.AdminUsersCheckBoxTooltip')} arrow>
            <Checkbox
              onChange={chooseUser(user)}
              checked={states.checked.indexOf(user) !== -1}
            />
          </Tooltip>
        </ListItemSecondaryAction>
      </div>
      <div className = {styles.user__info}>
        <div>{t ('description.AdminUsersListId')}{user._id}</div>
        <div>{t ('description.AdminUsersListRoles')}{user.roles}</div>
        <div>{t ('description.AdminUsersListAvatar')}{user.avatar}</div>
        {user.iat !== 0 ?
          <div>
            <div>
              {t ('description.AdminUsersListLoginTime')}{moment.unix(user.iat).format("hh:mm:ss DD.MM.YYYY")}
            </div>
            <div>
              {t ('description.AdminUsersListTokenExp')}{moment.unix(user.exp).format("hh:mm:ss DD.MM.YYYY")}
            </div>
          </div>
        :
          <div>
            {t ('description.AdminUsersListStatus')}
          </div>
        }
        <div>{t ('description.AdminUsersListRegistration')}{moment(user.registrationDate).format('llll')}</div>
      </div>
    </ListItem>
  )
}

export default UserComp