import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-Ingredients-list.module.css'
import { BurgerIngredientsCard } from '../BurgerIngredientsCard/burger-ingredients-card'
import { useSelector } from 'react-redux'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { Modal } from '../Modal/modal'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'

// eslint-disable-next-line react/display-name
export const BurgerIngredientsList = React.forwardRef(({ title, type }, ref) => {
  const { data } = useSelector(ingredientsSelector)
  const ingredients = useMemo(() => data.filter((el) => el.type === type), [data])
  const [modalState, setModalState] = useState({
    card: null,
    state: false
  })

  function closeModal () {
    setModalState({
      card: null,
      state: false
    })
  }

  return (
    <div ref={ref} className="pb-10">
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={`${styles.list} pt-6 pl-4 pr-4`}>
        {
          ingredients.map((item) => {
            return (
              <BurgerIngredientsCard card={item} key={item._id} modal={setModalState}/>
            )
          })
        }
      </ul>
      {
        modalState.state && <Modal title="Детали ингредиента" close={closeModal}>
          <IngredientDetails ingredients={modalState.card}/>
        </Modal>
      }
    </div>
  )
})

BurgerIngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string
}
