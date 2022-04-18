import React from 'react';

import Avatar from '@material-ui/core/Avatar';

import StyledBadge from './withStyles.js'
import useStyles from './makeStyles.js'
import styles from './ProfileData.module.css'
import avatar from './img/avatar.jpg'

const ProfileData = () => {
    const classes = useStyles();

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
        <Avatar src = {avatar} className={classes.large} />
      </StyledBadge>
    </div>
  );
}

export default ProfileData