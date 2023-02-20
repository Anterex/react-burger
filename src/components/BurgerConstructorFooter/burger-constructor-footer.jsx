import React from 'react'
import styles from './burger-constructor-footer.module.css'
import { BurgerConstructorTotal } from '../BurgerConstructorTotal/burger-constructor-total'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import { createOrder } from '../../services/slices/order-details'
import { authorizationSelector } from '../../services/slices/auth'
import { useLocation, useNavigate } from 'react-router-dom'

export const BurgerConstructorFooter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { bun, ingredientsConstructor } = useSelector(burgerConstructorSelector)
  const { isAuthChecked } = useSelector(authorizationSelector)

  const create = () => {
    if (!isAuthChecked) {
      navigate('/login', { replace: true, state: { from: location.pathname } })
    }
    isAuthChecked && bun &&
    dispatch(createOrder({
      ingredients: [bun._id, ...ingredientsConstructor.map(ingredient => ingredient._id), bun._id]
    }))
  }
  return (<div className={`pt-10 ${styles.footer}`}>
    <BurgerConstructorTotal/>
    <Button htmlType="button" type="primary" size="large" disabled={bun === null}
            onClick={ create }>
      Оформить заказ
    </Button>
  </div>)
}
