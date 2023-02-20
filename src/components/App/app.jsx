import React, { useEffect } from 'react'
import { AppHeader } from '../AppHeader/app-header'
import { Modals } from '../Modals/modals'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Main } from '../../pages/Main/main'
import { Login } from '../../pages/Login/login'
import { Register } from '../../pages/Register/register'
import { ForgotPassword } from '../../pages/ForgotPassword/forgot-password'
import { ResetPassword } from '../../pages/ResetPassword/reset-password'
import { Profile } from '../../pages/Profile/profile'
import { Page404 } from '../../pages/404/page-404'
import { ProtectedRoute } from '../ProtectedRoute/protected-route'
import { authorizationSelector, checkAuth, getUser, isLoad } from '../../services/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'
import { Modal } from '../Modal/modal'
import { getIngredients, ingredientsSelector } from '../../services/slices/ingredients'

export const App = () => {
  const dispatch = useDispatch()
  const { isAuthChecked } = useSelector(authorizationSelector)
  const location = useLocation()
  const history = useNavigate()
  const background = location.state && location.state.background
  const {
    isLoading,
    hasError,
    data
  } = useSelector(ingredientsSelector)

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkAuth())
    }
  }, [])

  useEffect(() => {
    const get = async () => {
      await dispatch(getUser())
    }
    const load = async () => {
      await dispatch(isLoad())
    }
    isAuthChecked && get()
    load()
  }, [isAuthChecked])

  const handleModalClose = () => {
    history(-1)
  }

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <AppHeader/>
      {!isLoading && !hasError && data.length &&
        <Routes location={background || location}>
          <Route path="/login" element={<ProtectedRoute onlyUnAuth={true}><Login/> </ProtectedRoute>} exact={true}/>
          <Route path="/register" element={<ProtectedRoute onlyUnAuth={true}><Register/></ProtectedRoute>} exact={true}/>
          <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth={true}><ForgotPassword/></ProtectedRoute>} exact={true}/>
          <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth={true}><ResetPassword/></ProtectedRoute>} exact={true}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} exact={true}/>
          <Route path="/ingredients/:ingredientId" exact element={<IngredientDetails/>}/>
          <Route path="/" element={<Main/>} exact={true}/>
          <Route path="*" element={<Page404/>} exact={true}/>
        </Routes>
      }
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={<Modal title="Детали ингредиента" onClose={handleModalClose}> <IngredientDetails/> </Modal>}/>
        </Routes>
      )}
      <Modals/>
    </>
  )
}
