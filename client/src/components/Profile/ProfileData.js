import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import Paper from '@material-ui/core/Paper'

import StyledBadge from './withStyles.js'
import useStyles from './makeStyles.js'
import styles from './ProfileData.module.css'
import { uploadAvatar, deleteAvatar } from '../../http/fileApi'
import { setUser } from '../../store/userReducer'


const ProfileData = () => {
  const userStore = useSelector(state => state.user.user)
  const classes = useStyles()
  const { t } = useTranslation()
  const [avatar, setAvatar] = useState(userStore.avatar)
  const dispatch = useDispatch()

  const upload = async (e) => {
    try {
      const file = e.target.files[0]
      await uploadAvatar(file).then(data => {
        dispatch(setUser(
          userStore.id, 
          userStore.username, 
          userStore.roles, 
          userStore.theme, 
          userStore.language,
          userStore.chats, 
          userStore.iat, 
          userStore.exp, 
          data, 
          userStore.about))
      })
      
      setAvatar(avatar)
    } catch (error) {
      alert(error.message)
    }
    
  }

  const deleteFile = () => {
    deleteAvatar()
    setAvatar(avatar)
    dispatch(setUser(
      userStore.id, 
      userStore.username, 
      userStore.roles, 
      userStore.theme, 
      userStore.language, 
      userStore.chats, 
      userStore.iat, 
      userStore.exp, 
      '', 
      userStore.about
    ))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.avatarContainer}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          {userStore.avatar === '' || undefined || null ? 
            <Avatar className={classes.large} />
          :
            <Avatar className={classes.large} src={`${process.env.REACT_APP_URL_API}` + userStore.avatar} />
          }
        </StyledBadge>
      </Paper>
      <Paper className={classes.buttons}>
        <div>
          <input 
            accept="image/*" 
            className={classes.input}
            id="icon-button-file"  
            type="file"
            onChange = {e => upload(e)} 
          />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <Tooltip title={t ('description.ProfileUploadTooltip')} arrow>
                <PhotoCamera className={styles.icon} />
              </Tooltip>
            </IconButton>
          </label>
        </div>
        <IconButton color="primary" component="span" onClick={deleteFile}>
          <Tooltip title={t ('description.ProfileDeleteTooltip')} arrow>
            <DeleteForeverRoundedIcon className={styles.icon} />
          </Tooltip>
        </IconButton>
      </Paper>
    </div>
  );
}

export default ProfileData