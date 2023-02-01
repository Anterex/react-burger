import { BackEndUrl } from './config'
import { getData, getDataFailure, getDataSuccess } from '../services/slices/ingredients'
import { createdOrder } from '../services/slices/orde-details'

export function getIngredients () {
  return async function (dispatch) {
    dispatch(getData())
    const url = `${BackEndUrl}/ingredients`
    try {
      const response = await fetch(url)
      const data = await checkResponse(response)
      dispatch(getDataSuccess(data.data))
    } catch (error) {
      dispatch(getDataFailure())
      console.log('Ошибка получения списка ингредиентов', error)
    }
  }
}
export function createOrder (order) {
  return async function (dispatch) {
    const url = `${BackEndUrl}/orders`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
      const data = await checkResponse(response)
      dispatch(createdOrder(data))
    } catch (error) {
      dispatch(createdOrder(null))
      console.log('Ошибка создания заказа', error)
    }
  }
}

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
      new Error(`Ошибка API ${response.status}: ${response.statusText}`)
    )
}
