import React from 'react'
import PropTypes from 'prop-types'
import styles from './burger-Ingredients-list.module.css'
import { IngredientPropTypes } from '../../utils/propTypes'
import { BurgerIngredientsCard } from '../BurgerIngredientsCard/burger-ingredients-card'

export const BurgerIngredientsList = ({ title, ingredients }) => {
  return (
    <div className="pb-10">
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={`${styles.list} pt-6 pl-4 pr-4`}>
        {
          ingredients.map((item) => {
            return (
              <BurgerIngredientsCard card={item} key={item._id}/>
            )
          })
        }
      </ul>
    </div>
  )
}

BurgerIngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired
}
