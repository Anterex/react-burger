import React, { FC, RefObject, useRef } from 'react'
import styles from './burger-ingredients.module.css'
import { BurgerIngredientsList } from '../BurgerIngredientsList/burger-Ingredients-list'
import { INGREDIENT_TYPES } from '../../utils/constants'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerIngredients: FC = () => {
  const topRef = useRef<HTMLDivElement>(null)
  const bunRef = useRef<HTMLDivElement>(null)
  const sauceRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const defaultState = INGREDIENT_TYPES.BUN
  const [current, setCurrent] = React.useState<INGREDIENT_TYPES>(defaultState)

  const scrollTo = (ref: RefObject<HTMLDivElement>): void => {
    ref.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const calDistance = (ref: RefObject<HTMLDivElement>): number => {
    const topDistance: number = topRef.current?.getBoundingClientRect().y ?? 0
    return Math.abs(topDistance - (ref.current?.getBoundingClientRect().y ?? 0))
  }

  const onScroll = (): void => {
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
        onClick={() => {
          setCurrent(INGREDIENT_TYPES.BUN)
          scrollTo(bunRef)
        }}> Булки </Tab>
      <Tab
        value={INGREDIENT_TYPES.SAUCE}
        active={current === INGREDIENT_TYPES.SAUCE}
        onClick={() => {
          setCurrent(INGREDIENT_TYPES.SAUCE)
          scrollTo(sauceRef)
        }}> Соусы </Tab>
      <Tab
        value={INGREDIENT_TYPES.MAIN}
        active={current === INGREDIENT_TYPES.MAIN}
        onClick={() => {
          setCurrent(INGREDIENT_TYPES.MAIN)
          scrollTo(mainRef)
        }}> Начинки </Tab>
    </div>
    <div ref={topRef} className={styles.list} onScroll={onScroll}>
      <BurgerIngredientsList ref={bunRef} type={INGREDIENT_TYPES.BUN} title="Булки" />
      <BurgerIngredientsList ref={sauceRef} type={INGREDIENT_TYPES.SAUCE} title="Соусы" />
      <BurgerIngredientsList ref={mainRef} type={INGREDIENT_TYPES.MAIN} title="Начинки" />
    </div>
  </section>)
}
