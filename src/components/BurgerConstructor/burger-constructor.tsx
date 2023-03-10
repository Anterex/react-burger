import React, { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './burger-constructor.module.css'
import { BurgerConstructorFixedItem } from '../BurgerConstructorFixedItem/burger-constructor-fixed-item'
import { BurgerConstructorItemsList } from '../BurgerConstructorItemsList/burger-constructor-items-list'
import { BurgerConstructorFooter } from '../BurgerConstructorFooter/burger-constructor-footer'
import { addIngredient } from '../../services/slices/burger-constructor'
import { DRAG_TYPES } from '../../utils/constants'
import { useDrop } from 'react-dnd'
import { useAppDispatch } from '../../services/slices'

interface IDropObject {
  itemId: string
}

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch()

  const [, drop] = useDrop<any, any, any>({
    accept: DRAG_TYPES.ingredient,
    drop (item: IDropObject) {
      const newItem = {
        ...item,
        uniqueId: uuidv4()
      }
      dispatch(addIngredient(newItem))
    }
  })

  return (
    <section className={styles.container} >
        <div ref={drop} className={styles.burgerConstructor}>
        <BurgerConstructorFixedItem type='top'/>
        <BurgerConstructorItemsList/>
        <BurgerConstructorFixedItem type='bottom'/>
      </div>
      <BurgerConstructorFooter/>
    </section>
  )
}
