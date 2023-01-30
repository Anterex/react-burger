import React from 'react'
import { Modal } from '../Modal/modal'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'
import { OrderDetails } from '../OrderDetails/order-details'
import { useSelector } from 'react-redux'
import { modalSelector } from '../../services/slices/modal'

export const Modals = () => {
  const modal = useSelector(modalSelector)

  return (
    <>
    {
      modal.showIngredientDetails && (<Modal title="Детали ингредиента">
        <IngredientDetails/>
      </Modal>)
    }

    {
     modal.showOrderDetails && <Modal title="">
      <OrderDetails />
     </Modal>
    }
   </>
  )
}
