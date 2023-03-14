import React, { FC } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor-fixed-item.module.css'
import { useSelector } from 'react-redux'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'

interface IFixedItem {
  type?: 'top' | 'bottom'
}

export const BurgerConstructorFixedItem: FC<IFixedItem> = ({ type }) => {
  const postfix = type === 'top' ? '(верх)' : '(низ)'
  const { bun } = useSelector(burgerConstructorSelector)
  return (
    <div className={`${styles.item} mb-4 pr-4`}>
      {(bun != null) && <ConstructorElement
        type={type}
        isLocked={true}
        text={`${bun.name} ${postfix}`}
        price={bun.price}
        thumbnail={bun.image}
      />}
    </div>)
}
