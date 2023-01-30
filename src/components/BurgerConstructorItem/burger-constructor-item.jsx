import React, { useRef } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientPropTypes } from '../../utils/propTypes'
import styles from './burger-constructor-item.module.css'
import { deleteIngredient, moveIngredient } from '../../services/slices/burger-constructor'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import { DRAG_TYPES } from '../../utils/constants'

export const BurgerConstructorItem = ({ ingredient, index }) => {
  const dispatch = useDispatch()

  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPES.constructor,
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: DRAG_TYPES.constructor,
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch(moveIngredient({ fromIndex: dragIndex, toIndex: hoverIndex }))
      item.index = hoverIndex
    }
  })

  drag(drop(ref))

  const opacity = isDragging ? 0 : 1

  return (
    <li ref={ref} style={{ opacity }} className={styles.item} >
        <DragIcon type="primary"/>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => {
            dispatch(deleteIngredient(index))
          }}
        />
    </li>
  )
}

BurgerConstructorItem.propTypes = {
  ingredient: IngredientPropTypes.isRequired,
  index: PropTypes.number.isRequired
}
