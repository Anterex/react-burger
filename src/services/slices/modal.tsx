import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './index'

const initialState = {
  showIngredientDetails: false,
  showOrderDetails: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openIngredientDetailsForm: (state) => {
      state.showIngredientDetails = true
    },
    openOrderDetailsForm: (state) => {
      state.showOrderDetails = true
    },
    closeModalForm: (state) => {
      state.showIngredientDetails = false
      state.showOrderDetails = false
    }
  }
})

export const { openIngredientDetailsForm, openOrderDetailsForm, closeModalForm } = modalSlice.actions

export const modalSelector = (state: RootState): RootState['modal'] => state.modal
