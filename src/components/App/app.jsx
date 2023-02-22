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
// import { authorizationSelector, checkAuth } from '../../services/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'
import { Modal } from '../Modal/modal'
import { getIngredients, ingredientsSelector } from '../../services/slices/ingredients'
import { Orders } from '../../pages/Orders/orders'
import { checkAuth } from '../../services/slices/auth'
import { orderDetailsSelector } from '../../services/slices/order-details'
import { LoadingSpinner } from '../LoadingSpinner/loading-spinner'

export const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useNavigate()
  const background = location.state && location.state.background
  const { isLoading, hasError, data } = useSelector(ingredientsSelector)
  const { isLoading: orderIsLoading } = useSelector(orderDetailsSelector)

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(checkAuth())
  }, [])

  if (isLoading || orderIsLoading) {
    return (
      <LoadingSpinner/>
    )
  }

  const goPrevPage = -1
  const handleModalClose = () => {
    history(goPrevPage)
  }
  console.log('app')
  return (
    <>
      <AppHeader/>
      {!isLoading && !hasError && data.length &&
        <Routes location={background || location}>
          <Route path="/login" element={<ProtectedRoute><Login/> </ProtectedRoute>} exact={true}/>
          <Route path="/register" element={<ProtectedRoute ><Register/></ProtectedRoute>} exact={true}/>
          <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword/></ProtectedRoute>} exact={true}/>
          <Route path="/reset-password" element={<ProtectedRoute><ResetPassword/></ProtectedRoute>} exact={true}/>
          <Route path="/profile" element={<ProtectedRoute onlyAuth={true}><Profile/></ProtectedRoute>} exact={true}/>
          <Route path="/profile/orders" element={<ProtectedRoute onlyAuth={true}><Orders/></ProtectedRoute>} exact={true}/>
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
