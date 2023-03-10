import React, { FC } from 'react'
import styles from './burger-constructor-footer.module.css'
import { BurgerConstructorTotal } from '../BurgerConstructorTotal/burger-constructor-total'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import { createOrder } from '../../services/slices/order-details'
import { authorizationSelector } from '../../services/slices/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../services/slices'

export const BurgerConstructorFooter: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { bun, ingredientsConstructor } = useSelector(burgerConstructorSelector)
  const { authenticated } = useSelector(authorizationSelector)

  const create = (): void => {
    if (!authenticated) {
      navigate('/login', { replace: true, state: { from: location.pathname } })
    }
    authenticated && (bun != null) &&
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
