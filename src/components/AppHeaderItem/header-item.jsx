import React from 'react'
import PropTypes from 'prop-types'
import styles from './header-item.module.css'

export const HeaderItem = (props) => {
  const cname = props.active ? 'text_type_main-default' : 'text_type_main-default text_color_inactive'
  return (
    <a href='/' className={`${styles.link} p-4 text ${cname}`}>
        {props.icon}
        <span className={cname}>{props.children}</span>
    </a>
  )
}

HeaderItem.propTypes = {
  icon: PropTypes.object,
  active: PropTypes.bool,
  children: PropTypes.string
}
