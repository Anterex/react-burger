import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './burger-constructor.module.css'
import { BurgerConstructorFixedItem } from '../BurgerConstructorFixedItem/burger-constructor-fixed-item'
import { BurgerConstructorItemsList } from '../BurgerConstructorItemsList/burger-constructor-items-list'
import { BurgerConstructorFooter } from '../BurgerConstructorFooter/burger-constructor-footer'
import { useDispatch } from 'react-redux'
import { addIngredient } from '../../services/slices/burger-constructor'
import { DRAG_TYPES } from '../../utils/constants'
import { useDrop } from 'react-dnd'

export const BurgerConstructor = () => {
  const dispatch = useDispatch()

  const [, drop] = useDrop({
    accept: DRAG_TYPES.ingredient,
    drop (item) {
      const newItem = {
        ...item,
        uniqueId: uuidv4()
      }
      dispatch(addIngredient(newItem))
    }
  })

  return (
    <section className={styles.container}>
      <div ref={drop} className={styles.constructor}>
        <BurgerConstructorFixedItem type={'top'}/>
        <BurgerConstructorItemsList/>
        <BurgerConstructorFixedItem type={'bottom'}/>
      </div>
      <BurgerConstructorFooter/>
    </section>
  )
}
