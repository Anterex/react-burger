import { createSlice } from '@reduxjs/toolkit'
import { ingredientsListUrl } from '../../utils/config'
import { request } from '../../utils/api'
import { optionsGet } from '../../utils/apiOptions'
import { IIngredientElement } from '../../Abstraction/IIngredientElement'
import { RootState } from './index'

interface IInitial {
  isLoading: boolean
  hasError: boolean
  data: IIngredientElement[]
}

const initialState: IInitial = {
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

export const ingredientsSelector = (state: RootState): RootState['ingredients'] => state.ingredients

export function getIngredients () {
  return async function (dispatch: any) {
    dispatch(getData())
    try {
      const data = await request(ingredientsListUrl, optionsGet())
      dispatch(getDataSuccess((data as any).data))
    } catch (error) {
      dispatch(getDataFailure())
      console.log('Ошибка получения списка ингредиентов', error)
    }
  }
}
