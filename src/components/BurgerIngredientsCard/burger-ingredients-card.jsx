import React from 'react'
import { IngredientPropTypes } from '../../utils/propTypes'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients-card.module.css'
import PropTypes from 'prop-types'

export const BurgerIngredientsCard = ({ card, modal }) => {
  return (
    <>
      <li className={styles.card} onClick={() => modal({ card, state: true }) }>
        <Counter count={1} size="default" extraClass="m-1" />
        <div className="pl-4 pr-4">
          <img src={card.image} alt={card.name}/>
        </div>
        <span className={`${styles.price} mt-1 text text_type_digits-default`}>{card.price}
          <CurrencyIcon type="primary"/></span>
        <h3 className={`mt-1 text text_type_main-default ${styles.name}`}>{card.name}</h3>
      </li>
    </>
  )
}

BurgerIngredientsCard.propTypes = {
  card: IngredientPropTypes.isRequired,
  modal: PropTypes.func.isRequired
}
