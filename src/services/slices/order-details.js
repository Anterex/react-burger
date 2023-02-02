import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderId: null,
  isLoading: false
}

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    creatingOrder: (state) => {
      state.orderId = null
      state.isLoading = true
    },
    createdOrder: (state, { payload }) => {
      state.orderId = payload.order.number
      state.isLoading = false
    }
  }
})

export const { creatingOrder, createdOrder } = orderDetailsSlice.actions

export const orderDetailsSelector = state => state.orderDetails
