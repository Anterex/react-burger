import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderId: null
}

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    createdOrder: (state, { payload }) => {
      state.orderId = payload.order.number
    }
  }
})

export const { createdOrder } = orderDetailsSlice.actions

export const orderDetailsSelector = state => state.orderDetails
