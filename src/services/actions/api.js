import { BackEndUrl } from '../../utils/config'
import { getData, getDataFailure, getDataSuccess } from '../slices/ingredients'
import { openOrderDetailsForm } from '../slices/modal'
import { clearConstructor } from '../slices/burger-constructor'
import { createdOrder, creatingOrder } from '../slices/order-details'

export function getIngredients () {
  return async function (dispatch) {
    dispatch(getData())
    const url = `${BackEndUrl}/ingredients`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const data = await request(url, options)
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
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    }
    try {
      dispatch(creatingOrder())
      const data = await request(url, options)
      dispatch(createdOrder(data))
      dispatch(clearConstructor())
      dispatch(openOrderDetailsForm())
    } catch (error) {
      dispatch(createdOrder(null))
      console.log('Ошибка создания заказа', error)
    }
  }
}

export function request (url, options) {
  return fetch(url, options)
    .then(checkResponse)
}

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
      new Error(`Ошибка API ${response.status}: ${response.statusText}`)
    )
}
