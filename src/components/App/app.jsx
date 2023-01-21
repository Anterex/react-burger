import React, { useEffect, useState } from 'react'
import { AppHeader } from '../AppHeader/app-header'
import { BurgerIngredients } from '../BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../BurgerConstructor/burger-constructor'
import { getIngredients } from '../../utils/burger-api'
import styles from './app.module.css'

export const App = () => {
  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    ingredients: []
  })

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setState({
          ...state,
          ingredients: data.data,
          isLoading: false
        })
      })
      .catch((error) => {
        setState({
          ...state,
          hasError: true,
          isLoading: false
        })
        console.log(error)
      })
  }, [])

  const { ingredients, isLoading, hasError } = state

  return (<>
    <AppHeader/>
    <main className={styles.main}>
      {isLoading && 'Загрузка...'}
      {hasError && 'Ошибка'}
      {!isLoading && !hasError && (<>
        <BurgerIngredients data={ingredients}/>
        <BurgerConstructor data={ingredients}/>
      </>)}
    </main>
  </>)
}
