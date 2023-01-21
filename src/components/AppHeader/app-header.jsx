import React from 'react'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { HeaderItem } from '../AppHeaderItem/header-item'
import styles from './app-header.module.css'

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navigation}>
          <HeaderItem active={true} icon={<BurgerIcon type="primary"/>}> Конструктор </HeaderItem>
          <HeaderItem active={true} icon={<ListIcon type="primary"/>}> Лента заказов </HeaderItem>
        </nav>
        <a href="/" className={styles.logo}> <Logo/> </a>
        <div className={styles.login}>
          <HeaderItem active={false} icon={<ProfileIcon type="secondary"/>}> Личный кабинет </HeaderItem>
        </div>
      </div>
    </header>
  )
}
