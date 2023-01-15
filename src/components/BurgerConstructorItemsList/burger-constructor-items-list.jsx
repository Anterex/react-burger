import React from 'react'
import PropTypes from 'prop-types'
import styles from './burger-constructor-items-list.module.css'
import { BurgerConstructorItem } from '../BurgerConstructorItem/burger-constructor-item'
import { IngredientPropTypes } from '../../utils/propTypes'

export const BurgerConstructorItemsList = ({ ingredients }) => {
  return (
    <ul className={styles.list}>
      {
        ingredients.map((ingredient) => {
          return <BurgerConstructorItem ingredient={ingredient} key={ingredient._id}/>
        }
        )
      }
    </ul>)
}

BurgerConstructorItemsList.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired
}
