import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './main-page.module.css'
import { BurgerIngredients } from '../BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../BurgerConstructor/burger-constructor'
import { useSelector } from 'react-redux'
import { ingredientsSelector } from '../../services/slices/ingredients'

const {
  isLoading,
  hasError,
  data
} = useSelector(ingredientsSelector)

export const MainPage = () => {
  return (
  <main className={styles.main}>
    {isLoading && 'Загрузка...'}
    {hasError && 'Ошибка'}
    {!isLoading && !hasError && data.length && <>
      <DndProvider backend={HTML5Backend}>
      <BurgerIngredients/>
      <BurgerConstructor/>
      </DndProvider>
    </>}
  </main>
  )
}
