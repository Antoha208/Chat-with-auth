import React, { useState, useContext } from 'react'


import Modal from '@mui/material/Modal'


import stylesJS from './makeStyles.js'
import useClasses from '../../../CustomHooks/useClasses.js'
import { Context } from '../context.js'
import SimpleModal from './SimpleModal/SimpleModal.js'
import AcceptModal from '../Modal/AcceptModal/AcceptModal.js'
import ShortcutsModal from './ShortcutsModal/ShortcutsModal.js'


const RootModal = () => {
  const classes = useClasses(stylesJS)
  const { states, closeCheckBar, closeAcceptBar, closeShortcuts } = useContext(Context)
  const [modalStyle] = useState(getModalStyle)

  const handleCloseCheck = () => {
    closeCheckBar()
  }

  const handleCloseAccept = () => {
    closeAcceptBar()
  }
  
  function getModalStyle() {
    const top = 50
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    }
  }

  return (
    <div>
      {states.openAcceptModal ?
        <Modal
          open={states.openAcceptModal}
          onClose={handleCloseAccept}
        >
          <div style={modalStyle} className={classes.paper}>
            <AcceptModal />
          </div>
        </Modal>
      :
        states.openCheckModal ? 
          <Modal
            open={states.openCheckModal}
            onClose={handleCloseCheck}
          >
            <div style={modalStyle} className={classes.paper}>
              <SimpleModal />
            </div>
          </Modal>
        :
          states.openShortcutsModal ?
            <Modal
              open={states.openShortcutsModal}
              onClose={closeShortcuts}
            >
              <div style={modalStyle} className={classes.paper}>
                <ShortcutsModal />
              </div>
            </Modal>
          :
            ''
      }   
    </div>
  )
}

export default RootModal
