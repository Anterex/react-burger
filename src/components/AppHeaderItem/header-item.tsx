import React, { FC } from 'react'
import styles from './header-item.module.css'
import { Link } from 'react-router-dom'

interface IHeaderItem {
  active: boolean
  url: string
  icon: any
  children: any
}

export const HeaderItem: FC<IHeaderItem> = ({ active, url, icon, children }) => {
  const cname = active ? 'text_type_main-default' : 'text_type_main-default text_color_inactive'
  return (
    <Link to={url} className={`${styles.link} p-4 text ${cname}`}>
      {icon}
      <span className={cname}>{children}</span>
    </Link>
  )
}
