import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css'
import { BurgerIngredientsList } from '../BurgerIngredientsList/burger-Ingredients-list'
import { IngredientPropTypes } from '../../utils/propTypes'
import { BurgerIngredientsTabs } from '../BurgerIngredientsTabs/burger-ingredients-tabs'

export const BurgerIngredients = ({ data }) => {
  const buns = useMemo(() => data.filter((el) => el.type === 'bun'), [data])
  const mains = useMemo(() => data.filter((el) => el.type === 'main'), [data])
  const sauces = useMemo(() => data.filter((el) => el.type === 'sauce'), [data])

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
      <BurgerIngredientsTabs/>
      <div className={styles.list}>
        <BurgerIngredientsList ingredients={buns} title="Булки"/>
        <BurgerIngredientsList ingredients={sauces} title="Соусы"/>
        <BurgerIngredientsList ingredients={mains} title="Начинки"/>
      </div>
    </section>)
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired
}
