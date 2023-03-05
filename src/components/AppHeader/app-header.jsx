import React from 'react'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { HeaderItem } from '../AppHeaderItem/header-item'
import styles from './app-header.module.css'
import { matchRoutes, useLocation } from 'react-router-dom'

export const AppHeader = () => {
  const { pathname } = useLocation()
  const isConstructor = matchRoutes([{ path: '/' }], pathname) && true
  const isProfile = matchRoutes([{ path: '/profile' }, { path: '/login' }, { path: '/profile/orders' }], pathname) && true

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navigation}>
          <HeaderItem url={'/'} active={isConstructor} icon={<BurgerIcon type={!isConstructor ? 'secondary' : 'primary'}/>}> Конструктор </HeaderItem>
          <HeaderItem url={'/profile/orders'} active={false} icon={<ListIcon type="secondary"/>}> Лента заказов </HeaderItem>
        </nav>
        <a href="/" className={styles.logo}> <Logo/> </a>
        <div className={styles.login}>
          <HeaderItem url={'/profile'} active={isProfile} icon={<ProfileIcon type={!isProfile ? 'secondary' : 'primary'}/>}> Личный кабинет </HeaderItem>
        </div>
      </div>
    </header>
  )
}
