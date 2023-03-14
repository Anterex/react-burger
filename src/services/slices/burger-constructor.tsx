import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIngredientElement } from '../../Abstraction/IIngredientElement'
import { RootState } from './index'

interface IInitial {
  bun: IIngredientElement | null
  ingredientsConstructor: IIngredientElement[]
  sum: number
  bunPrice: number
}

const initialState: IInitial = {
  bun: null,
  ingredientsConstructor: [],
  sum: 0,
  bunPrice: 0
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, { payload }: PayloadAction<any>) => {
      if (payload != null) {
        if (payload.type === 'bun') {
          state.sum -= state.bunPrice
          state.bunPrice = payload.price * 2
          state.sum += state.bunPrice
          state.bun = payload
        } else {
          state.ingredientsConstructor.push(payload)
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          state.sum += payload.price
        }
      }
    },
    deleteIngredient: (state, { payload }) => {
      if (payload > -1) {
        state.sum -= state.ingredientsConstructor[payload].price
        state.ingredientsConstructor.splice(payload, 1)
      }
    },
    moveIngredient: (state, { payload }) => {
      const element = state.ingredientsConstructor[payload.fromIndex]
      state.ingredientsConstructor.splice(payload.fromIndex, 1)
      state.ingredientsConstructor.splice(payload.toIndex, 0, element)
    },
    clearConstructor: () => initialState
  }
}
)

export const { addIngredient, deleteIngredient, moveIngredient, clearConstructor } = burgerConstructorSlice.actions

export const burgerConstructorSelector = (state: RootState): RootState['burgerConstructor'] => state.burgerConstructor
