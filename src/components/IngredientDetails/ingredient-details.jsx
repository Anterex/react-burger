import React from 'react'
import styles from './ingredient-details.module.css'
import { IngredientDetailsDescription } from '../IngredientDetailsDescription/ingredient-details-description'
import { useSelector } from 'react-redux'
import { ingredientDetailsSelector } from '../../services/slices/ingredient-details'

export const IngredientDetails = () => {
  const { selectedIngredient } = useSelector(ingredientDetailsSelector)

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={selectedIngredient.image_large} alt={selectedIngredient.name}/>
      </div>
      <h4 className={'text text_type_main-medium title mt-4'}>{selectedIngredient.name}</h4>
      <ul className={`mt-8 ${styles.list}`}>
        <IngredientDetailsDescription name={'Калории,ккал'} value={selectedIngredient.calories}/>
        <IngredientDetailsDescription name={'Белки, г'} value={selectedIngredient.proteins}/>
        <IngredientDetailsDescription name={'Жиры, г'} value={selectedIngredient.fat}/>
        <IngredientDetailsDescription name={'Углеводы, г'} value={selectedIngredient.carbohydrates}/>
      </ul>
    </div>
  )
}
