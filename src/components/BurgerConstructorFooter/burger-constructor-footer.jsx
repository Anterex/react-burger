import React from 'react'
import styles from './burger-constructor-footer.module.css'
import { BurgerConstructorTotal } from '../BurgerConstructorTotal/burger-constructor-total'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import { createOrder } from '../../services/slices/api'

export const BurgerConstructorFooter = () => {
  const dispatch = useDispatch()
  const { bun, ingredientsConstructor } = useSelector(burgerConstructorSelector)

  const create = () => dispatch(createOrder({ ingredients: [bun._id, ...ingredientsConstructor.map(ingredient => ingredient._id), bun._id] }))

  return (<div className={`pt-10 ${styles.footer}`}>
    <BurgerConstructorTotal/>
    <Button htmlType="button" type="primary" size="large" disabled={bun === null}
            onClick={ create }>
      Оформить заказ
    </Button>
  </div>)
}
