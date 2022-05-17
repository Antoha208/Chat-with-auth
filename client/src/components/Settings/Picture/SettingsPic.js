import React from 'react'


import settings from '../img/settings.png'
import styles from './SettingsPic.module.css'

const SettingsPic = () => {

    return (
        <div className={styles.container}>
            <img src = { settings } alt = 'settings' className = { styles.settings } />
        </div>
    );
}

export default SettingsPic