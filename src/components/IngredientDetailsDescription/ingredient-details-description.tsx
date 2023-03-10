import React, { FC } from 'react'
import styles from './ingredient-details-description.module.css'

interface IIngredientDescription {
  name: string
  value: string
}

export const IngredientDetailsDescription: FC<IIngredientDescription> = ({ name, value }) => {
  return (<li className={styles.item}>
    <span className="text text_type_main-default text_color_inactive">{name}</span>
    <span className="text text_type_digits-default text_color_inactive">{value}</span>
  </li>)
}
