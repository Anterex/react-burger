import React from 'react'
import styles from './ingredient-details.module.css'
import { IngredientPropTypes } from '../../utils/propTypes'
import { IngredientDetailsDescription } from '../IngredientDetailsDescription/ingredient-details-description'

export const IngredientDetails = ({ ingredients }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={ingredients.image_large} alt={ingredients.name}/>
      </div>
      <h4 className={'text text_type_main-medium title mt-4'}>{ingredients.name}</h4>
      <ul className={`mt-8 ${styles.list}`}>
        <IngredientDetailsDescription name={'Калории,ккал'} value={ingredients.calories}/>
        <IngredientDetailsDescription name={'Белки, г'} value={ingredients.proteins}/>
        <IngredientDetailsDescription name={'Жиры, г'} value={ingredients.fat}/>
        <IngredientDetailsDescription name={'Углеводы, г'} value={ingredients.carbohydrates}/>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredients: IngredientPropTypes.isRequired
}
