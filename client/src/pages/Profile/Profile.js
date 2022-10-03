import React from 'react'


import { Card } from '@material-ui/core'


import styles from './Profile.module.css'
import useStyles from './makeStyles'
import ProfilePhoto from '../../components/Profile/ProfilePhoto/ProfilePhoto'
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'


const Profile = () => {
  const classes = useStyles()
  
  return (
    <Card className={styles.container}>
      <NavBar />
      <div className={styles.card}>
        <Card className={classes.avatarContainer}>
          <ProfilePhoto />   
        </Card>
        <Card className={classes.infoContainer}>
          <ProfileInfo />
        </Card>
      </div>
    </Card>
  )
}

export default Profile
