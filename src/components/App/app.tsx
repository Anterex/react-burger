import React, { FC, useEffect } from 'react'
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
import { useSelector } from 'react-redux'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'
import { Modal } from '../Modal/modal'
import { getIngredients, ingredientsSelector } from '../../services/slices/ingredients'
import { Orders } from '../../pages/Orders/orders'
import { checkAuth } from '../../services/slices/auth'
import { orderDetailsSelector } from '../../services/slices/order-details'
import { LoadingSpinner } from '../LoadingSpinner/loading-spinner'
import { useAppDispatch } from '../../services/slices'

export const App: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const history = useNavigate()
  const background: string | null = location.state?.background
  const { isLoading, hasError, data } = useSelector(ingredientsSelector)
  const { isLoading: orderIsLoading } = useSelector(orderDetailsSelector)

  useEffect(() => {
    void dispatch(getIngredients())
    dispatch(checkAuth())
  }, [])

  if (isLoading || orderIsLoading) {
    return (
      <LoadingSpinner/>
    )
  }
  const goPrevPage = -1
  const handleModalClose = (): void => {
    history(goPrevPage)
  }
  return (
    <>
      <AppHeader/>
      {!isLoading && !hasError && (data.length > 0) &&
        <Routes location={background ?? location}>
          <Route path="/login" element={<ProtectedRoute><Login/> </ProtectedRoute>}/>
          <Route path="/register" element={<ProtectedRoute ><Register/></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword/></ProtectedRoute>} />
          <Route path="/reset-password" element={<ProtectedRoute><ResetPassword/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute onlyAuth={true}><Profile/></ProtectedRoute>} />
          <Route path="/profile/orders" element={<ProtectedRoute onlyAuth={true}><Orders/></ProtectedRoute>} />
          <Route path="/ingredients/:ingredientId" element={<IngredientDetails/>}/>
          <Route path="/" element={<Main/>} />
          <Route path="*" element={<Page404/>} />
        </Routes>
      }
      {background ?? (
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
