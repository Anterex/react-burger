import React, { useState } from 'react'
import { IngredientPropTypes } from '../../utils/propTypes'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients-card.module.css'
import { Modal } from '../Modal/modal'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'

export const BurgerIngredientsCard = ({ card }) => {
  const [openedModal, setOpenedModal] = useState(false)
  function closeModal () {
    setOpenedModal(false)
  }

  return (
    <>
      <li className={styles.card} onClick={() => { setOpenedModal(true) }}>
        <Counter count={1} size="default" extraClass="m-1" />
        <div className="pl-4 pr-4">
          <img src={card.image} alt={card.name}/>
        </div>
        <span className={`${styles.price} mt-1 text text_type_digits-default`}>{card.price}
          <CurrencyIcon type="primary"/></span>
        <h3 className={`mt-1 text text_type_main-default ${styles.name}`}>{card.name}</h3>
      </li>
      {openedModal && <Modal title="Детали ингредиента" close={closeModal}>
          <IngredientDetails ingredients={card}/>
        </Modal>
      }
    </>
  )
}

BurgerIngredientsCard.propTypes = {
  card: IngredientPropTypes.isRequired
}
