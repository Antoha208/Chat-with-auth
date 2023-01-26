import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'


import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'


import StyledBadge from './withStyles.js'
import stylesJS from './makeStyles.js'
import useClasses from '../../../CustomHooks/useClasses.js'
import styles from './ProfilePhoto.module.css'
import { uploadAvatar, deleteAvatar } from '../../../http/fileApi.js'
import { resetProfilePhoto, setProfilePhoto } from '../../../store/userReducer.js'


const ProfilePhoto = () => {
  const userStore = useSelector(state => state.user.user)
  const classes = useClasses(stylesJS)
  const { t } = useTranslation()
  const [avatar, setAvatar] = useState(userStore.avatar)
  const dispatch = useDispatch()

  const upload = async (e) => {
    try {
      const file = e.target.files[0]
      await uploadAvatar(file).then(data => {
        dispatch(setProfilePhoto(data))
      })
      setAvatar(avatar)
    } catch (error) {
      alert(error.message)
    } 
  }

  const deleteFile = async () => {
    await deleteAvatar()
    setAvatar(avatar)
    dispatch(resetProfilePhoto())
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.avatarContainer}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                <PhotoCameraRoundedIcon className={styles.icon} />
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
  )
}

export default ProfilePhoto
