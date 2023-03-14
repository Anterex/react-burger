import React, { FC } from 'react'
import styles from './burger-constructor-items-list.module.css'
import { BurgerConstructorItem } from '../BurgerConstructorItem/burger-constructor-item'
import { useSelector } from 'react-redux'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'

export const BurgerConstructorItemsList: FC = () => {
  const { ingredientsConstructor } = useSelector(burgerConstructorSelector)
  return (
    <ul className={styles.list}>
      {
        ingredientsConstructor.map((ingredient, index) => {
          return <BurgerConstructorItem ingredient={ingredient} key={ingredient.uniqueId} index={index.toString()} />
        }
        )
      }
    </ul>)
}
