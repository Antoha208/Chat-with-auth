import React, { useState, useContext } from 'react'


import Modal from '@material-ui/core/Modal'


import useStyles from './makeStyles'
import { Context } from '../context'
import SimpleModal from './SimpleModal/SimpleModal'
import AcceptModal from '../Modal/AcceptModal/AcceptModal'
import ShortcutsModal from './ShortcutsModal/ShortcutsModal'


const RootModal = () => {
  const classes = useStyles()
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