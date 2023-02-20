import React from 'react'
import styles from './main.module.css'
import { BurgerIngredients } from '../../components/BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../../components/BurgerConstructor/burger-constructor'
import { useSelector } from 'react-redux'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { orderDetailsSelector } from '../../services/slices/order-details'

export const Main = () => {
  const {
    isLoading,
    hasError
  } = useSelector(ingredientsSelector)

  const { isLoading: orderIsLoading } = useSelector(orderDetailsSelector)

  if (isLoading || orderIsLoading) {
    return (
    <LoadingSpinner/>
    )
  }

  return (
    <main className={styles.main}>
      {hasError && 'Ошибка'}
      {!isLoading && !hasError && <>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DndProvider>
      </>}
    </main>
  )
}
