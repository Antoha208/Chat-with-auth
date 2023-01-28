import React from 'react'


import Card from '@mui/material/Card'


import styles from './Profile.module.css'
import stylesJS from './makeStyles.js'
import useClasses from '../../CustomHooks/useClasses.js'
import ProfilePhoto from '../../components/Profile/ProfilePhoto/ProfilePhoto.js'
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo.js'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'


const Profile = () => {
  const classes = useClasses(stylesJS)
  
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
