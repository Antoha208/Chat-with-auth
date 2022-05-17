import React from 'react'
import { useSelector } from 'react-redux'


import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

import styles from './ChatElement.module.css'

const ChatElement = () => {
  // const userStore = useSelector(state => state.user.user)
  // const allUsers = useSelector(state => state.users.users)
  const selectedUser = useSelector(state => state.companion.companion)
  
    return (
      <div className = {styles.container}>
        <div className = {styles.content}>
          <ListItemAvatar>
              <Avatar
                  src={ selectedUser.avatar !== '' ?
                    `${process.env.REACT_APP_URL_API + selectedUser.avatar}`
                  :
                    ''
                  }
              />
          </ListItemAvatar>
          <ListItemText>{selectedUser.username}</ListItemText>
        </div>
      </div>
    )
}

export default ChatElement