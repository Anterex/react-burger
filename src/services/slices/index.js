import { ingredientsSlice } from './ingredients'
import { combineReducers } from 'redux'
export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer
})
