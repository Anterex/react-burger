import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/modal-overlay'

const root = document.querySelector('#root')

export const Modal = (props) => {
  useEffect(() => {
    function closeModalEscape (event) {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('keyup', closeModalEscape)

    return () => {
      document.removeEventListener('keyup', closeModalEscape)
    }
  }, [])

  const { title, close } = props

  return ReactDOM.createPortal(
    (<>
        <div className={`${styles.modal} p-10 pb-15`}>
          <div className={styles.header}>
            <h3 className="text text_type_main-large">{title}</h3>
            <button className={styles.close} onClick={close}>
              <CloseIcon type="primary"/>
            </button>
          </div>
          {props.children}
        </div>
        <ModalOverlay closeHandler={close}/>
      </>
    ), root
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func.isRequired
}
