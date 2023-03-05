import { createSlice } from '@reduxjs/toolkit'
import { createOrderUrl } from '../../utils/config'
import { clearConstructor } from './burger-constructor'
import { openOrderDetailsForm } from './modal'
import { request } from '../../utils/api'
import { optionsPost } from '../../utils/apiOptions'

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

export function createOrder (order) {
  return async function (dispatch) {
    try {
      dispatch(creatingOrder())
      const data = await request(createOrderUrl, optionsPost(order))
      dispatch(createdOrder(data))
      dispatch(clearConstructor())
      dispatch(openOrderDetailsForm())
    } catch (error) {
      dispatch(createdOrder(null))
      console.log('Ошибка создания заказа', error)
    }
  }
}
