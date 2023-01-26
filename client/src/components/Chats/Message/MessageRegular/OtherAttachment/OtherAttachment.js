import React from 'react'
import { useTranslation } from 'react-i18next'
import FileSaver from 'file-saver'


import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'


import styles from './../MessageRegular.module.css'
import ANY from './../img/ANY.png'
import DOC from './../img/DOC.png'
import MP4 from './../img/MP4.png'
import PDF from './../img/PDF.png'
import TIF from './../img/TIF.png'
import TXT from './../img/TXT.png'
import WMA from './../img/WMA.png'
import XLS from './../img/XLS.png'


const OtherAttachment = ({mess}) => {
    const { t } = useTranslation()
    
    return (    
        <div className={styles.attachment__wrapper}>
            <div className={styles.attachment__wrapperCont}>
                <img 
                    alt = ''
                    className={styles.attachment__file} 
                    src=
                        {mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'pdf' ?
                            PDF
                        :
                            mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'txt' ?
                                TXT
                            :
                                mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'docx' ?
                                    DOC
                                :
                                    mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'xlsx' ?
                                        XLS
                                    :
                                        mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'tiff' ?
                                            TIF
                                        :
                                            mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'wma' ?
                                                WMA
                                            :
                                                mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'mp4' ?
                                                    MP4
                                                :
                                                    ANY
                        }
                />
                {mess.attachment.fileName.match(/[^.]+$/gm)[0] === 'mp4' ?
                    <div>
                        <a href={`${process.env.REACT_APP_URL_API}` + mess.attachment.fileName} target="_blank" rel="noopener noreferrer" download>
                            <Button className = {styles.attachment__btn}>
                                <Tooltip title={t ('description.WhatchAttachmentTooltip')} arrow>
                                    <VisibilityRoundedIcon />
                                </Tooltip>
                            </Button>
                        </a>
                        <Button className = {styles.attachment__btn} onClick={() => {FileSaver.saveAs(`${process.env.REACT_APP_URL_API}` + mess.attachment.fileName, mess.attachment.fileName)}}>
                            <Tooltip title={t ('description.GetAttachmentTooltip')} arrow>
                                <GetAppRoundedIcon />
                            </Tooltip>
                        </Button>
                    </div>
                :
                    <Button className = {styles.attachment__btn} onClick={() => {FileSaver.saveAs(`${process.env.REACT_APP_URL_API}` + mess.attachment.fileName, mess.attachment.fileName)}}>
                        <Tooltip title={t ('description.GetAttachmentTooltip')} arrow>
                            <GetAppRoundedIcon />
                        </Tooltip>
                    </Button>
                }
            </div>
        </div>
    )
}
                            
export default OtherAttachment
