import { ingredientsSlice } from './ingredients'
import { combineReducers } from 'redux'
import { orderSlice } from './order'
export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  order: orderSlice.reducer
})
