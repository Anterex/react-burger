import React, { useEffect } from 'react'
import { AppHeader } from '../AppHeader/app-header'
import { BurgerIngredients } from '../BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../BurgerConstructor/burger-constructor'
import styles from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, ingredientsSelector } from '../../services/slices/ingredients'

export const App = () => {
  const dispatch = useDispatch()
  const {
    isLoading,
    hasError,
    data
  } = useSelector(ingredientsSelector)

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return <>
    <AppHeader/>
    <main className={styles.main}>
      {isLoading && 'Загрузка...'}
      {hasError && 'Ошибка'}
      {!isLoading && !hasError && data.length && <>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </>}
    </main>
  </>
}
