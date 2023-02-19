import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
  hasError: false,
  data: []
}
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getData: state => {
      state.isLoading = true
    },
    getDataSuccess: (state, { payload }) => {
      state.data = payload
      state.isLoading = false
      state.hasError = false
    },
    getDataFailure: state => {
      state.isLoading = false
      state.hasError = true
    }
  }
})
export const {
  getData,
  getDataSuccess,
  getDataFailure
} = ingredientsSlice.actions

export const ingredientsSelector = state => state.ingredients
