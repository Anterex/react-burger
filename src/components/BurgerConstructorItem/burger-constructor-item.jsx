import React from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientPropTypes } from '../../utils/propTypes'
import styles from './burger-constructor-item.module.css'

export const BurgerConstructorItem = ({ ingredient }) => {
  return (
    <li className={styles.item}>
        <DragIcon type="primary"/>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
    </li>
  )
}

BurgerConstructorItem.propTypes = {
  ingredient: IngredientPropTypes.isRequired
}
