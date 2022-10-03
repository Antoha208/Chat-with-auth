import React from 'react'


import { Card } from '@material-ui/core'


import styles from './Admin.module.css'
import useStyles from './makeStyles'
import AdminButtons from '../../components/Admin/AdminButtons/AdminButtons'
import AdminPic from '../../components/Admin/Picture/AdminPic'
import NavBar from '../../components/NavBar/NavBar/NavBar.js'

const Admin = () => {
  const classes = useStyles()

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
