import React from 'react'
import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

export const ModalOverlay = ({ closeHandler }) => {
  return (
    <div className={styles.overlay} onClick={closeHandler}></div>
  )
}

ModalOverlay.propTypes = {
  closeHandler: PropTypes.func.isRequired
}
