import React from 'react'
import PropTypes from 'prop-types'
import styles from './header-item.module.css'
import { Link } from 'react-router-dom'

export const HeaderItem = (props) => {
  const cname = props.active ? 'text_type_main-default' : 'text_type_main-default text_color_inactive'
  return (
    <Link to={props.url} className={`${styles.link} p-4 text ${cname}`}>
      {props.icon}
      <span className={cname}>{props.children}</span>
    </Link>
  )
}

HeaderItem.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.object,
  active: PropTypes.bool,
  children: PropTypes.string
}
