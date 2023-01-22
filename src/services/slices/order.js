import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: []
}
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    Add: (state, { payload }) => {
      state.data = payload
    },
    Delete: (state, { payload }) => {
      state.data = payload
    }
  }
})
export const {
  Add,
  Delete
} = orderSlice.actions
export const orderSelector = state => state.order
