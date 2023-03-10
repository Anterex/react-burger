import React, { FC, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/modal-overlay'

const root = document.querySelector('#modal') as HTMLElement

interface IModal {
  title?: string
  onClose?: () => void
  children: any
}

export const Modal: FC<IModal> = ({ title, onClose, children }) => {
  const closeModalEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      if (onClose != null) {
        onClose()
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeModalEscape)
    return () => {
      document.removeEventListener('keydown', closeModalEscape)
    }
  }, [])

  return ReactDOM.createPortal(
    (<>
        <div className={`${styles.modal} p-10 pb-15`}>
          <div className={styles.header}>
            <h3 className="text text_type_main-large">{title}</h3>
            <button className={styles.close} onClick={onClose}>
              <CloseIcon type="primary"/>
            </button>
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose}/>
      </>
    ), root
  )
}
