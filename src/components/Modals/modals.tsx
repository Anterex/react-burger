import React, { FC } from 'react'
import { Modal } from '../Modal/modal'
import { OrderDetails } from '../OrderDetails/order-details'
import { closeModalForm, modalSelector } from '../../services/slices/modal'
import { useAppDispatch } from '../../services/slices'
import { useSelector } from 'react-redux'

export const Modals: FC = () => {
  const modal = useSelector(modalSelector)

  const dispatch = useAppDispatch()

  const closePopup = (): void => {
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
