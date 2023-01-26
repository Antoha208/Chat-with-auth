import React from 'react'
import { useTranslation } from 'react-i18next'
import FileSaver from 'file-saver'


import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded'


import styles from './../MessageRegular.module.css'
import stylesJS from './../makeStyles.js'
import useClasses from '../../../../../CustomHooks/useClasses.js'


const PictureAttachment = ({mess, zoom, localDispatch}) => {
    const classes = useClasses(stylesJS)
    const { t } = useTranslation()

    return (    
        <div className={styles.attachment__wrapper}>
            {zoom ?
                <Modal
                    open={zoom}
                    onClose={() => localDispatch({type: '!zoom'})}
                >
                    <img 
                        alt = ''
                        className={classes.paper} 
                        src={`${process.env.REACT_APP_URL_API}` + mess.attachment.fileName}
                        onClick={() => localDispatch({type: '!zoom'})}
                    />
                </Modal>
            :
                <div className={styles.attachment__wrapperCont}>
                    <img 
                        alt = ''
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
