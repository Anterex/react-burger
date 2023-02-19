import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/modal-overlay'
import { useDispatch } from 'react-redux'
import { closeModalForm } from '../../services/slices/modal'

const root = document.querySelector('#modal')

export const Modal = (props) => {
  const dispatch = useDispatch()

  const closePopup = () => {
    dispatch(closeModalForm())
  }

  useEffect(() => {
    function closeModalEscape (event) {
      if (event.key === 'Escape') {
        closePopup()
      }
    }

    document.addEventListener('keyup', closeModalEscape)

    return () => {
      document.removeEventListener('keyup', closeModalEscape)
    }
  }, [])

  const { title } = props

  return ReactDOM.createPortal(
    (<>
        <div className={`${styles.modal} p-10 pb-15`}>
          <div className={styles.header}>
            <h3 className="text text_type_main-large">{title}</h3>
            <button className={styles.close} onClick={closePopup}>
              <CloseIcon type="primary"/>
            </button>
          </div>
          {props.children}
        </div>
        <ModalOverlay closeHandler={closePopup}/>
      </>
    ), root
  )
}

Modal.propTypes = {
  title: PropTypes.string
}
