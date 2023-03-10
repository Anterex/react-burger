import { combineReducers } from 'redux'
import { orderDetailsSlice } from './order-details'
import { ingredientsSlice } from './ingredients'
import { modalSlice } from './modal'
import { burgerConstructorSlice } from './burger-constructor'
import { authorizationSlice } from './auth'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { store } from '../../index'

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  modal: modalSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  authorization: authorizationSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
