import React, { FC } from 'react'
import styles from './burger-constructor-total.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import { useSelector } from 'react-redux'

export const BurgerConstructorTotal: FC = () => {
  const { sum } = useSelector(burgerConstructorSelector)
  return (<div className={styles.total}>
    <span className="text text_type_digits-medium">{sum}</span>
    <CurrencyIcon type="primary"/>
  </div>)
}
