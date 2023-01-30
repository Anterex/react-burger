import React from 'react'
import styles from './burger-constructor-footer.module.css'
import { BurgerConstructorTotal } from '../BurgerConstructorTotal/burger-constructor-total'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../utils/burger-api'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import { openOrderDetailsForm } from '../../services/slices/modal'
import { orderDetailsSelector } from '../../services/slices/orde-details'

export const BurgerConstructorFooter = () => {
  const dispatch = useDispatch()
  const { bun, ingredientsConstructor } = useSelector(burgerConstructorSelector)
  const { orderId: id } = useSelector(orderDetailsSelector)

  return (<div className={`pt-10 ${styles.footer}`}>
    <BurgerConstructorTotal/>
    <Button htmlType="button" type="primary" size="large"
            onClick={async () => {
              await dispatch(createOrder({ ingredients: [bun._id, ...ingredientsConstructor.map(ingredient => ingredient._id), bun._id] }))
              id && dispatch(openOrderDetailsForm())
            }}>
      Оформить заказ
    </Button>
  </div>)
}
