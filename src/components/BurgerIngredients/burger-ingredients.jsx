import React, { useRef } from 'react'
import styles from './burger-ingredients.module.css'
import { BurgerIngredientsList } from '../BurgerIngredientsList/burger-Ingredients-list'
import { INGREDIENT_TYPES } from '../../utils/constants'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerIngredients = () => {
  const topRef = useRef(null)
  const bunRef = useRef(null)
  const sauceRef = useRef(null)
  const mainRef = useRef(null)
  const defaultState = INGREDIENT_TYPES.BUN
  const [current, setCurrent] = React.useState(defaultState)

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth'
    })
  }
  const calDistance = (ref) => {
    const topDistance = topRef.current.getBoundingClientRect().y
    return Math.abs(topDistance - ref.current.getBoundingClientRect().y)
  }

  const onScroll = () => {
    const bunYDistance = calDistance(bunRef)
    const sauceYDistance = calDistance(sauceRef)
    const mainYDistance = calDistance(mainRef)
    const minTabDistance = Math.min(bunYDistance, sauceYDistance, mainYDistance)
    const activeTab = minTabDistance === sauceYDistance
      ? INGREDIENT_TYPES.SAUCE
      : minTabDistance === mainYDistance
        ? INGREDIENT_TYPES.MAIN
        : INGREDIENT_TYPES.BUN
    setCurrent(activeTab)
  }

  return (<section className={styles.container}>
    <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
    <div className={styles.tabs}>
      <Tab
        value={INGREDIENT_TYPES.BUN}
        active={current === INGREDIENT_TYPES.BUN}
        onClick={e => {
          setCurrent(e)
          scrollTo(bunRef)
        }}> Булки </Tab>
      <Tab
        value={INGREDIENT_TYPES.SAUCE}
        active={current === INGREDIENT_TYPES.SAUCE}
        onClick={e => {
          setCurrent(e)
          scrollTo(sauceRef)
        }}> Соусы </Tab>
      <Tab
        value={INGREDIENT_TYPES.MAIN}
        active={current === INGREDIENT_TYPES.MAIN}
        onClick={e => {
          setCurrent(e)
          scrollTo(mainRef)
        }}> Начинки </Tab>
    </div>
    <div ref={topRef} className={styles.list} onScroll={onScroll}>
      <BurgerIngredientsList ref={bunRef} type={INGREDIENT_TYPES.BUN} title="Булки" id={INGREDIENT_TYPES.BUN}/>
      <BurgerIngredientsList ref={sauceRef} type={INGREDIENT_TYPES.SAUCE} title="Соусы" id={INGREDIENT_TYPES.SAUCE}/>
      <BurgerIngredientsList ref={mainRef} type={INGREDIENT_TYPES.MAIN} title="Начинки" id={INGREDIENT_TYPES.MAIN}/>
    </div>
  </section>)
}
