import React from 'react'
import { IngredientPropTypes } from '../../utils/propTypes'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients-card.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { openIngredientDetailsForm } from '../../services/slices/modal'
import { selectIngredient } from '../../services/slices/ingredient-details'
import { useDrag } from 'react-dnd'
import { DRAG_TYPES } from '../../utils/constants'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'

export const BurgerIngredientsCard = ({ card }) => {
  const dispatch = useDispatch()
  const { bun, ingredientsConstructor } = useSelector(burgerConstructorSelector)
  const id = card._id

  const count = ingredientsConstructor.filter(x => x._id === id).length

  const [{ isDrag }, drag] = useDrag({
    type: DRAG_TYPES.ingredient,
    item: () => card,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  })

  const opacity = isDrag ? 0.5 : 1
  const quantity = bun && bun._id === card._id ? 2 : count

  return (
      <li ref={drag} style={{ opacity }} className={styles.card} onClick={() => {
        dispatch(selectIngredient(card))
        dispatch(openIngredientDetailsForm())
      } }>
        <Counter count={quantity} size="default" extraClass="m-1" />
        <div className="pl-4 pr-4">
          <img src={card.image} alt={card.name}/>
        </div>
        <span className={`${styles.price} mt-1 text text_type_digits-default`}>{card.price}
          <CurrencyIcon type="primary"/></span>
        <h3 className={`mt-1 text text_type_main-default ${styles.name}`}>{card.name}</h3>
      </li>
  )
}

BurgerIngredientsCard.propTypes = {
  card: IngredientPropTypes.isRequired
}
