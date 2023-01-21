import { createSlice } from '@reduxjs/toolkit'
import { getIngredients } from '../../utils/burger-api'

const initialState = {
  isLoading: false,
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

export function fetchData () {
  return async function (dispatch) {
    dispatch(getData())
    try {
      const data = await getIngredients()
      dispatch(getDataSuccess(data.data))
    } catch (error) {
      dispatch(getDataFailure())
    }
  }
}
