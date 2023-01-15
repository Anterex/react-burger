import React from 'react'
import PropTypes from 'prop-types'
import styles from './order-details.module.css'
import OrderCreatedIcon from '../../images/OrderCreated.svg'
export const OrderDetails = ({ id }) => {
  return (
    <div className={styles.wrapper}>
      <div className={`text text_type_digits-large ${styles.id}`}>{id}</div>
      <span className="mt-8 text text_type_main-medium">идентификатор заказа</span>
      <div className={styles.icon}>
        <img src={OrderCreatedIcon} alt="Confirmed"/>
      </div>
      <div className={styles.footer}>
        <span className="text text_type_main-small">Ваш заказ начали готовить</span>
        <span className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</span>
      </div>
    </div>
  )
}

OrderDetails.propTypes = {
  id: PropTypes.number.isRequired
}
