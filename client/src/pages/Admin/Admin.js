import React from 'react'


import Card from '@mui/material/Card'


import styles from './Admin.module.css'
import stylesJS from './makeStyles.js'
import useClasses from '../../CustomHooks/useClasses.js'
import AdminButtons from '../../components/Admin/AdminButtons/AdminButtons.js'
import AdminPic from '../../components/Admin/Picture/AdminPic.js'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'

const Admin = () => {
  const classes = useClasses(stylesJS)

  return (
    <Card className={styles.container}>
      <NavBar />
      <div className={styles.card}>
        <Card className={classes.avatarContainer}>
          <AdminPic />
        </Card>
        <Card className={classes.infoContainer}>
          <AdminButtons />
        </Card>
      </div>
    </Card>
  )
}

export default Admin
