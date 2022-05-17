import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'


import { Button, IconButton } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import Grid from '@material-ui/core/Grid'
import LiveHelpRoundedIcon from '@material-ui/icons/LiveHelpRounded';


import useStyles from './makeStyles'
import styles from './ShortcutsModal.module.css'
import { Context } from '../../context'


const ShortcutsModal = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { shortcuts, closeShortcuts } = useContext(Context)
  

  const handleCloseAccept = () => {
    closeShortcuts()
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.title__text}>{t ('description.ShortcutsModalTitle')}</div>
          <IconButton className={classes.button} onClick={handleCloseAccept}>
            <ClearRoundedIcon className={styles.icon} />
          </IconButton>
        </div>
        <CardContent className={classes.cardContent}>
            <div className={styles.command}>
              <div className={styles.icon__disabled}>{t ('description.ShortcutsModalArrows')}</div>
              <div className={styles.command__text}>{t ('description.ShortcutsModalNavigation')}</div>
            </div>
            <div className={styles.command}>
                <div className={styles.icon__disabled}>
                  <div className={styles.icon__text}>Enter</div>
                </div>
                <div className={styles.command__text}>{t ('description.ShortcutsModalSendMessage')}</div>
            </div>
            <div className={styles.command}>
              <div className={styles.icon__disabled}>Esc</div>
              <div className={styles.command__text}>{t ('description.ShortcutsModalStepBack')}</div>
            </div>
        </CardContent>
      </div>
    </div>
  );
}

export default ShortcutsModal