import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedIngredient: null
}

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientsDetails',
  initialState,
  reducers: {
    selectIngredient: (state, { payload }) => {
      state.selectedIngredient = payload
    }
  }
})

export const { selectIngredient } = ingredientDetailsSlice.actions

export const ingredientDetailsSelector = state => state.ingredientDetails
