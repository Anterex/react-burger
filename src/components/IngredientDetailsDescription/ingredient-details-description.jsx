import React from 'react'
import PropTypes from 'prop-types'
import styles from './ingredient-details-description.module.css'

export const IngredientDetailsDescription = ({ name, value }) => {
  return (<li className={styles.item}>
    <span className="text text_type_main-default text_color_inactive">{name}</span>
    <span className="text text_type_digits-default text_color_inactive">{value}</span>
  </li>)
}

IngredientDetailsDescription.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}
