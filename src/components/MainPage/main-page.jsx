import React, { useEffect } from 'react'
import styles from './main-page.module.css'
import { BurgerIngredients } from '../BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../BurgerConstructor/burger-constructor'
import { useDispatch, useSelector } from 'react-redux'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getIngredients } from '../../services/slices/api'
import { LoadingSpinner } from '../LoadingSpinner/loading-spinner'
import { orderDetailsSelector } from '../../services/slices/order-details'

export const MainPage = () => {
  const dispatch = useDispatch()

  const {
    isLoading,
    hasError
  } = useSelector(ingredientsSelector)

  const { isLoading: orderIsLoading } = useSelector(orderDetailsSelector)

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

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
