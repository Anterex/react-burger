import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor-fixed-item.module.css'
import { useSelector } from 'react-redux'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'

export const BurgerConstructorFixedItem = ({ type }) => {
  const postfix = type === 'top' ? '(верх)' : '(низ)'
  const { bun } = useSelector(burgerConstructorSelector)
  return (
    <div className={`${styles.item} mb-4 pr-4`}>
      {bun && <ConstructorElement
        type={type}
        isLocked={true}
        text={`${bun.name} ${postfix}`}
        price={bun.price}
        thumbnail={bun.image}
      />}
    </div>)
}

BurgerConstructorFixedItem.propTypes = {
  type: PropTypes.string.isRequired
}
