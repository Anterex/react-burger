import React from 'react'
import PropTypes from 'prop-types'
import styles from './burger-constructor-footer.module.css'
import { BurgerConstructorTotal } from '../BurgerConstructorTotal/burger-constructor-total'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { createOrder } from '../BurgerConstructor/burger-constructor'

export const BurgerConstructorFooter = ({ setOrderData, setOpenedModal }) => {
  return (<div className={`pt-10 ${styles.footer}`}>
    <BurgerConstructorTotal/>
    <Button htmlType="button" type="primary" size="large"
            onClick={() => {
              createOrder(setOrderData, setOpenedModal)
            }}>
      Оформить заказ
    </Button>
  </div>)
}

BurgerConstructorFooter.propTypes = {
  setOrderData: PropTypes.func.isRequired,
  setOpenedModal: PropTypes.func.isRequired
}
