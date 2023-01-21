import React from 'react'
import styles from './burger-ingredients.module.css'
import { BurgerIngredientsList } from '../BurgerIngredientsList/burger-Ingredients-list'
import { BurgerIngredientsTabs } from '../BurgerIngredientsTabs/burger-ingredients-tabs'

export const BurgerIngredients = () => {
  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
      <BurgerIngredientsTabs/>
      <div className={styles.list}>
        <BurgerIngredientsList type="bun" title="Булки"/>
        <BurgerIngredientsList type="main" title="Соусы"/>
        <BurgerIngredientsList type="sauce" title="Начинки"/>
      </div>
    </section>)
}
