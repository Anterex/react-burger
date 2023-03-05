import { combineReducers } from 'redux'
import { orderDetailsSlice } from './order-details'
import { ingredientsSlice } from './ingredients'
import { modalSlice } from './modal'
import { burgerConstructorSlice } from './burger-constructor'
import { authorizationSlice } from './auth'

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  modal: modalSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  authorization: authorizationSlice.reducer
})
