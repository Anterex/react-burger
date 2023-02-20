import React from 'react'
import { Modal } from '../Modal/modal'
import { OrderDetails } from '../OrderDetails/order-details'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalForm, modalSelector } from '../../services/slices/modal'

export const Modals = () => {
  const modal = useSelector(modalSelector)

  const dispatch = useDispatch()

  const closePopup = () => {
    dispatch(closeModalForm())
  }

  return (
    <>
      {
        modal.showOrderDetails && <Modal title="" onClose={closePopup}>
          <OrderDetails/>
        </Modal>
      }
    </>
  )
}
