import { createSlice } from '@reduxjs/toolkit'
import { forgotPasswordUrl, loginUrl, logoutUrl, registerUrl, resetPasswordUrl, userUrl } from '../../utils/config'
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie'
import { optionsGetSecured, optionsPatchSecured, optionsPost } from '../../utils/apiOptions'
import { fetchWithRefresh, request } from '../../utils/api'

const initialState = {
  authenticated: false,
  user: null,
  userDataLoading: false,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserLoading: false,

  updateUserError: null,
  updateUserLoading: false,

  getUserDataError: null,
  getUserRequest: false,

  forgotPasswordLoading: false,
  forgotPasswordError: null,

  logoutUserError: null
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loginUserRequest = true
      state.authenticated = false
      state.user = null
    },
    loginSuccess: (state) => {
      state.authenticated = true
      state.loginUserRequest = false
    },
    loginError: (state, { payload }) => {
      state.loginUserRequest = false
      state.loginUserError = payload
    },
    updateUserRequest: (state) => {
      state.updateUserRequest = true
    },
    updateUserSuccess: (state, { payload }) => {
      state.updateUserRequest = false
      state.user = payload
    },
    getUserRequest: (state) => {
      state.getUserRequest = true
    },
    getUserSuccess: (state, { payload }) => {
      state.getUserRequest = false
      state.user = payload
    },
    getUserError: (state, { payload }) => {
      state.getUserRequest = false
      state.getUserError = payload
    },
    updateUserError: (state, { payload }) => {
      state.loginUserRequest = false
      state.authenticated = false
      state.user = null
      state.updateUserError = payload
    },
    logoutSuccess: (state) => {
      state.authenticated = false
      state.user = null
    },
    logoutError: (state, { payload }) => {
      state.logoutUserError = payload
    },
    forgotRequest: (state) => {
      state.forgotPasswordRequest = true
    },
    forgotSuccess: (state) => {
      state.forgotPasswordRequest = false
    },
    forgotError: (state, { payload }) => {
      state.forgotPasswordRequest = false
      state.forgotPasswordError = payload
    }
  }
})

export const {
  forgotRequest,
  getUserSuccess,
  getUserRequest,
  logoutSuccess,
  loginRequest,
  loginSuccess,
  updateUserSuccess,
  updateUserRequest,
  forgotSuccess,
  updateUserError,
  forgotError,
  logoutError,
  loginError,
  getUserError
} = authorizationSlice.actions

export const authorizationSelector = state => state.authorization

export function register (form) {
  return async function (dispatch) {
    dispatch(loginRequest())
    return await request(registerUrl, optionsPost(form))
      .then(data => {
        if (data.success) {
          setCookie('accessToken', data.accessToken.split('Bearer ')[1])
          setCookie('refreshToken', data.refreshToken)
          localStorage.setItem('refreshToken', data.refreshToken)
          dispatch(loginSuccess())
        }
        return data.success
      }).catch(error => dispatch(loginError(error)))
  }
}

export function signIn (form) {
  return async function (dispatch) {
    dispatch(loginRequest())
    return await request(loginUrl, optionsPost(form))
      .then(data => {
        if (data.success) {
          console.log('signInSuccess:' + data)
          setCookie('accessToken', data.accessToken.split('Bearer ')[1])
          setCookie('refreshToken', data.refreshToken)
          localStorage.setItem('refreshToken', data.refreshToken)
          dispatch(loginSuccess())
        }
        return data.success
      }).catch(error => dispatch(loginError(error)))
  }
}

export function getUserData () {
  return async function (dispatch) {
    dispatch(getUserRequest())
    return await fetchWithRefresh(userUrl, optionsGetSecured())
      .then(async data => {
        if (data.success) {
          dispatch(getUserSuccess(data.user))
        }
        return data.success
      }).catch(error => dispatch(getUserError(error)))
  }
}

export function updateUser (form) {
  return async function (dispatch) {
    dispatch(updateUserRequest())
    await fetchWithRefresh(userUrl, optionsPatchSecured(form))
      .then(data => {
        if (data.success) {
          dispatch(updateUserSuccess(data.user))
        }
        return data.success
      }).catch(error => dispatch(updateUserError(error)))
  }
}

export function signOut () {
  return async function (dispatch) {
    await request(logoutUrl, optionsPost({ token: localStorage.getItem('refreshToken') }))
      .then(data => {
        if (data.success) {
          deleteCookie('accessToken')
          deleteCookie('refreshToken')
          localStorage.removeItem('refreshToken')
          dispatch(logoutSuccess())
        }
        return data.success
      }).catch(error => dispatch(logoutError(error)))
  }
}

export function forgotPassword (form) {
  return async function (dispatch) {
    dispatch(forgotRequest())
    return await request(forgotPasswordUrl, optionsPost(form))
      .then(data => {
        localStorage.setItem('reset', 'true')
        return data.success
      }).catch(error => dispatch(forgotError(error)))
  }
}
export function resetPassword (form) {
  return async function (dispatch) {
    return await request(resetPasswordUrl, optionsPost(form))
      .then(data => {
        dispatch(forgotSuccess())
        localStorage.removeItem('reset')
        return data.success
      }).catch(error => dispatch(forgotError(error)))
  }
}

export function checkAuth () {
  return async function (dispatch) {
    const token = getCookie('accessToken')
    if (token && JSON.parse(atob(token.split('.')[1])).exp * 1000 > Date.now()) {
      dispatch(loginSuccess())
    } else {
      dispatch(logoutSuccess())
    }
  }
}
