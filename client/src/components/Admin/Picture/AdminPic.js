import React from 'react'

import admin from '../img/admin.png'
import styles from './AdminPic.module.css'

const AdminPic = () => {

    return (
        <div className={styles.container}>
            <img src = { admin } alt = 'admin' className = { styles.admin } />
        </div>
    );
}

export default AdminPic