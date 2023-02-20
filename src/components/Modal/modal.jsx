import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/modal-overlay'

const root = document.querySelector('#modal')

export const Modal = (props) => {
  useEffect(() => {
    function closeModalEscape (event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keyup', closeModalEscape)

    return () => {
      document.removeEventListener('keyup', closeModalEscape)
    }
  }, [])

  const { title, onClose } = props

  return ReactDOM.createPortal(
    (<>
        <div className={`${styles.modal} p-10 pb-15`}>
          <div className={styles.header}>
            <h3 className="text text_type_main-large">{title}</h3>
            <button className={styles.close} onClick={onClose}>
              <CloseIcon type="primary"/>
            </button>
          </div>
          {props.children}
        </div>
        <ModalOverlay closeHandler={onClose}/>
      </>
    ), root
  )
}

Modal.propTypes = {
  title: PropTypes.string
}
