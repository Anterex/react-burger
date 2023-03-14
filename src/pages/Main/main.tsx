import React, { FC } from 'react'
import styles from './main.module.css'
import { BurgerIngredients } from '../../components/BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../../components/BurgerConstructor/burger-constructor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const Main: FC = () => {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DndProvider>
    </main>
  )
}
