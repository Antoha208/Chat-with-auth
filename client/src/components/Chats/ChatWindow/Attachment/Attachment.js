import React from 'react'
import { useTranslation } from 'react-i18next'


import Tooltip from '@material-ui/core/Tooltip'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'


import styles from './Attachment.module.css'
import { deleteAttachment } from '../../../../http/fileApi'

const Attachment = ({localDispatch, states}) => {
    const { t } = useTranslation()

  const deleteFile = async () => {
      await deleteAttachment(states.filePath.fileName)
      localDispatch({type: 'filePath', payload: ''})
  }

    return (
        <div className={styles.attachment} onMouseLeave={states.zoomAttach ? () => {localDispatch({type: '!showAttach'}); localDispatch({type: '!zoomAttach'})} : () => localDispatch({type: '!showAttach'})}>
            {states.filePath === '' || undefined || null ?
              <></>
            :
              <div className={styles.attachment__wrapper}>
                {!states.zoomAttach && (
                  <div onClick={deleteFile}>
                    <Tooltip title={t ('description.ChatWindowDeleteAttachmentTooltip')} arrow>
                      <ClearRoundedIcon className={styles.attachment__icon} />
                    </Tooltip>
                  </div>
                )}
                <img 
                  className={states.zoomAttach ? styles.attachment__fileZoom : styles.attachment__file} 
                  src={`${process.env.REACT_APP_URL_API}` + states.filePath.fileName} 
                  onClick={states.zoomAttach ? () => localDispatch({type: '!zoomAttach'}) : () => localDispatch({type: 'zoomAttach'})} 
                />
              </div>
            }
          </div>
    )
}

export default Attachment