import React, { useMemo, useState } from 'react'
import styles from './burger-constructor.module.css'
import { BurgerConstructorFixedItem } from '../BurgerConstructorFixedItem/burger-constructor-fixed-item'
import { BurgerConstructorItemsList } from '../BurgerConstructorItemsList/burger-constructor-items-list'
import { Modal } from '../Modal/modal'
import { OrderDetails } from '../OrderDetails/order-details'
import { postOrder } from '../../utils/burger-api'
import { BurgerConstructorFooter } from '../BurgerConstructorFooter/burger-constructor-footer'
import { useSelector } from 'react-redux'
import { ingredientsSelector } from '../../services/slices/ingredients'

export const createOrder = (setOrderData, setOpenedModal) => {
  setOrderData(postOrder())
  setOpenedModal(true)
}
export const BurgerConstructor = () => {
  const { data } = useSelector(ingredientsSelector)
  const [openedModal, setOpenedModal] = useState(false)
  const [orderData, setOrderData] = useState(-1)

  const bun = useMemo(() => data.find((el) => el.type === 'bun'), [data])
  const ingredients = useMemo(() => data.filter((el) => el.type !== 'bun'), [data])

  return (
    <>
      <section className={styles.container}>
        <div className={styles.constructor}>
          <BurgerConstructorFixedItem type={'top'} data={bun}/>
          <BurgerConstructorItemsList ingredients={ingredients}/>
          <BurgerConstructorFixedItem type={'bottom'} data={bun}/>
        </div>
        <BurgerConstructorFooter setOpenedModal={setOpenedModal} setOrderData={setOrderData}/>
      </section>
      {openedModal && <Modal close={() => setOpenedModal(false)}>
        <OrderDetails id={orderData.id}/>
      </Modal>}
    </>
  )
}
