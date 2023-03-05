import React from 'react'
import { Link } from 'react-router-dom'
import styles from './page-404.module.css'

export const Page404 = () => {
  return (
    <div className={styles.content}>
      <p className="text text_type_digits-large">404</p>
      <p className="text text_type_main-large">Страница не найдена</p>
      <Link to={-1} className={styles.link}>
        Вернуться
      </Link>
    </div>
  )
}
