import { Action, createSlice, ThunkDispatch } from '@reduxjs/toolkit'
import { forgotPasswordUrl, loginUrl, logoutUrl, registerUrl, resetPasswordUrl, userUrl } from '../../utils/config'
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie'
import { optionsGetSecured, optionsPatchSecured, optionsPost } from '../../utils/apiOptions'
import { fetchWithRefresh, request } from '../../utils/api'
import { RootState } from './index'
import { IUser } from '../../Abstraction/IUser'

interface IInitial {
  authenticated: boolean
  user: IUser | null
  userDataLoading: boolean

  registerUserError: null
  registerUserRequest: boolean

  loginUserError: null
  loginUserRequest: boolean

  updateUserError: null
  updateUserRequest: boolean

  getUserError: null
  getUserRequest: boolean

  forgotPasswordRequest: boolean
  forgotPasswordError: null

  logoutUserError: null
}

const initialState: IInitial = {
  authenticated: false,
  user: null,
  userDataLoading: false,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  updateUserError: null,
  updateUserRequest: false,

  getUserError: null,
  getUserRequest: false,

  forgotPasswordRequest: false,
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

export const authorizationSelector = (state: RootState): RootState['authorization'] => state.authorization

interface IRegister {
  success: boolean
  user: IUser
  accessToken: string
  refreshToken: string
}

interface IRegisterForm extends IUser {
  password: string
}

export function register (form: IRegisterForm) {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(loginRequest())
    return await request<IRegister>(registerUrl, optionsPost(form))
      .then(data => {
        if (data.success) {
          setCookie('accessToken', data.accessToken.split('Bearer ')[1], {})
          setCookie('refreshToken', data.refreshToken, {})
          localStorage.setItem('refreshToken', data.refreshToken)
          dispatch(loginSuccess())
        }
        return data.success
      }).catch(error => dispatch(loginError(error)))
  }
}

interface ILogin {
  email: string
  password: string
}

export function signIn (form: ILogin) {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(loginRequest())
    return await request<IRegister>(loginUrl, optionsPost(form))
      .then(data => {
        if (data.success) {
          setCookie('accessToken', data.accessToken.split('Bearer ')[1], {})
          setCookie('refreshToken', data.refreshToken, {})
          localStorage.setItem('refreshToken', data.refreshToken)
          dispatch(loginSuccess())
        }
        return data.success
      }).catch(error => dispatch(loginError(error)))
  }
}

export function getUserData () {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(getUserRequest())
    return await fetchWithRefresh(userUrl, optionsGetSecured())
      .then(async data => {
        if (data.success) {
          // @ts-expect-error
          dispatch(getUserSuccess(data.user))
        }
        return data.success
      }).catch(error => dispatch(getUserError(error)))
  }
}

export function updateUser (form: any) {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(updateUserRequest())
    await fetchWithRefresh(userUrl, optionsPatchSecured(form))
      .then(data => {
        if (data.success) {
          // @ts-expect-error
          dispatch(updateUserSuccess(data.user))
        }
        return data.success
      }).catch(error => dispatch(updateUserError(error)))
  }
}

interface ISignOut {
  success: boolean
  message: string
}

export function signOut () {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    await request<ISignOut>(logoutUrl, optionsPost({ token: localStorage.getItem('refreshToken') }))
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

interface IForgotPassword {
  success: boolean
  message: string
}

interface IForgotPasswordForm {
  email: string
}

export function forgotPassword (form: IForgotPasswordForm): boolean | unknown {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(forgotRequest())
    return await request<IForgotPassword>(forgotPasswordUrl, optionsPost(form))
      .then(data => {
        localStorage.setItem('reset', 'true')
        return data.success
      }).catch(error => dispatch(forgotError(error)))
  }
}

interface IResetPassword {
  password: string
  token: string
}

export function resetPassword (form: IResetPassword) {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    return await request(resetPasswordUrl, optionsPost(form))
      .then(data => {
        dispatch(forgotSuccess())
        localStorage.removeItem('reset')
        // @ts-expect-error
        return data.success
      }).catch(error => dispatch(forgotError(error)))
  }
}

export function checkAuth (): any {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    const token = getCookie('accessToken')
    if (token != null && JSON.parse(atob(token.split('.')[1])).exp * 1000 > Date.now()) {
      dispatch(loginSuccess())
    } else {
      dispatch(logoutSuccess())
    }
  }
}
