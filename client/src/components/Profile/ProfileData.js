import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Paper from '@material-ui/core/Paper';

import StyledBadge from './withStyles.js'
import useStyles from './makeStyles.js'
// import styles from './ProfileData.module.css'
import { uploadAvatar, deleteAvatar } from '../../http/fileApi';
import { setUser } from '../../store/userReducer';


const ProfileData = () => {
  const userStore = useSelector(state => state.user.user)
  const classes = useStyles();
  const [avatar, setAvatar] = useState(userStore.avatar)


  const dispatch = useDispatch()

  const upload = async (e) => {
    try {
      const file = e.target.files[0]
      await uploadAvatar(file)
      const avatar = JSON.parse(localStorage.getItem('avatar'))
      dispatch(setUser(userStore.id, userStore.username, userStore.roles, userStore.iat, userStore.exp, avatar, userStore.about))
      setAvatar(avatar)
    } catch (error) {
      alert(error.message)
    }
    
  }

  const deleteFile = () => {
    deleteAvatar()
    setAvatar(avatar)
    dispatch(setUser(userStore.id, userStore.username, userStore.roles, userStore.iat, userStore.exp, '', userStore.about))
    localStorage.removeItem('avatar')
  }

  return (
    <div className={classes.root}>
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
      <Paper className={classes.buttons}>
        <IconButton className={classes.iconButton}>
          <input 
            accept="image/*" 
            className={classes.input} 
            id="icon-button-file" 
            type="file"
            onChange = {e => upload(e)} 
          />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </IconButton>
        <IconButton color="primary" component="span" onClick={deleteFile}>
          <DeleteForeverRoundedIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default ProfileData