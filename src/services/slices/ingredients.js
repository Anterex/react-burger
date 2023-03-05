import { createSlice } from '@reduxjs/toolkit'
import { ingredientsListUrl } from '../../utils/config'
import { request } from '../../utils/api'
import { optionsGet } from '../../utils/apiOptions'

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

export function getIngredients () {
  return async function (dispatch) {
    dispatch(getData())
    try {
      const data = await request(ingredientsListUrl, optionsGet)
      dispatch(getDataSuccess(data.data))
    } catch (error) {
      dispatch(getDataFailure())
      console.log('Ошибка получения списка ингредиентов', error)
    }
  }
}
