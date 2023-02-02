import { combineReducers } from 'redux'
import { orderDetailsSlice } from './order-details'
import { ingredientDetailsSlice } from './ingredient-details'
import { ingredientsSlice } from './ingredients'
import { modalSlice } from './modal'
import { burgerConstructorSlice } from './burger-constructor'

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  modal: modalSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer
})
