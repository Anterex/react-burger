import React from 'react'
import PropTypes from 'prop-types'
import { IngredientPropTypes } from '../../utils/propTypes'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor-fixed-item.module.css'

export const BurgerConstructorFixedItem = ({ type, data }) => {
  const postfix = type === 'top' ? '(верх)' : '(низ)'
  return (
    <div className={`${styles.item} mb-4 pr-4`}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${data.name} ${postfix}`}
        price={data.price}
        thumbnail={data.image}
      />
    </div>)
}

BurgerConstructorFixedItem.propTypes = {
  type: PropTypes.string.isRequired,
  data: IngredientPropTypes.isRequired
}
