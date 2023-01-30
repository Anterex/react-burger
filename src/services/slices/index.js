import { combineReducers } from 'redux'
import { orderDetailsSlice } from './orde-details'
import { ingredientDetailsSlice } from './ingredient-details'
import { ingredientsSlice } from './Ingredients'
import { modalSlice } from './modal'
import { burgerConstructorSlice } from './burger-constructor'

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  modal: modalSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer
})
