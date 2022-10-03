import React from 'react'
import { useTranslation } from 'react-i18next'
import FileSaver from 'file-saver'


import Modal from '@material-ui/core/Modal'
import { Button } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded'


import styles from './../MessageRegular.module.css'
import useStyles from './../makeStyles'


const PictureAttachment = ({mess, zoom, localDispatch}) => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (    
        <div className={styles.attachment__wrapper}>
            {zoom ?
                <Modal
                    open={zoom}
                    onClose={() => localDispatch({type: '!zoom'})}
                >
                    <img 
                        className={classes.paper} 
                        src={`${process.env.REACT_APP_URL_API}` + mess.attachment.fileName}
                        onClick={() => localDispatch({type: '!zoom'})}
                    />
                </Modal>
            :
                <div className={styles.attachment__wrapperCont}>
                    <img 
                        className={styles.attachment__file} 
                        src={`${process.env.REACT_APP_URL_API}` + mess.attachment.fileName}
                        onClick={() => localDispatch({type: 'zoom'})}
                    />
                    <Button className = {styles.attachment__btn} onClick={() => {FileSaver.saveAs(`${process.env.REACT_APP_URL_API}` + mess.attachment.fileName, mess.attachment.fileName)}}>
                        <Tooltip title={t ('description.GetAttachmentTooltip')} arrow>
                            <GetAppRoundedIcon />
                        </Tooltip>
                    </Button>
                </div>
            }
        </div>
    )
}
                            
export default PictureAttachment