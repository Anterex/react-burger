import React, { FC } from 'react'
import styles from './modal-overlay.module.css'

interface IModalOverlay {
  onClose?: () => void
}

export const ModalOverlay: FC<IModalOverlay> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}
