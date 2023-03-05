import React from 'react'
import { IngredientPropTypes } from '../../utils/propTypes'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients-card.module.css'
import { useSelector } from 'react-redux'
import { useDrag } from 'react-dnd'
import { DRAG_TYPES } from '../../utils/constants'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import { Link, useLocation } from 'react-router-dom'

export const BurgerIngredientsCard = ({ card }) => {
  const {
    bun,
    ingredientsConstructor
  } = useSelector(burgerConstructorSelector)
  const id = card._id

  const count = ingredientsConstructor.filter(x => x._id === id).length

  const [{ isDrag }, drag] = useDrag({
    type: DRAG_TYPES.ingredient,
    item: () => card,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  })

  const location = useLocation()

  const opacity = isDrag ? 0.5 : 1
  const quantity = bun && bun._id === card._id ? 2 : count

  return (
    <div className={styles.parent}>
      <Link key={id} to={{ pathname: `/ingredients/${id}` }} state={{ background: location }}>
        <li ref={drag} style={{ opacity }} className={styles.card}>
          <Counter count={quantity} size="default" extraClass="m-1"/>
          <div className="pl-4 pr-4">
            <img src={card.image} alt={card.name}/>
          </div>
          <span className={`${styles.price} mt-1 text text_type_digits-default`}>{card.price}
            <CurrencyIcon type="primary"/></span>
          <h3 className={`mt-1 text text_type_main-default ${styles.name}`}>{card.name}</h3>
        </li>
      </Link>
    </div>
  )
}

BurgerIngredientsCard.propTypes = {
  card: IngredientPropTypes.isRequired
}
