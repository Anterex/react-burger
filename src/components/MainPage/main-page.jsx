import React, { useEffect } from 'react'
import styles from './main-page.module.css'
import { BurgerIngredients } from '../BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../BurgerConstructor/burger-constructor'
import { useDispatch, useSelector } from 'react-redux'
import { ingredientsSelector } from '../../services/slices/Ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getIngredients } from '../../utils/burger-api'

export const MainPage = () => {
  const dispatch = useDispatch()

  const {
    isLoading,
    hasError
  } = useSelector(ingredientsSelector)

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  return (
    <main className={styles.main}>
      {isLoading && 'Загрузка...'}
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
