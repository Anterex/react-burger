import React from 'react'
import styles from './burger-constructor-total.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerConstructorTotal = () => {
  return (<div className={styles.total}>
    <span className="text text_type_digits-medium">610</span>
    <CurrencyIcon type="primary"/>
  </div>)
}
