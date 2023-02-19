import React from 'react'
import { AppHeader } from '../AppHeader/app-header'
import { Modals } from '../Modals/modals'
import { Routes, Route } from 'react-router-dom'
import { Main } from '../../pages/Main/main'
import { Login } from '../../pages/Login/login'
import { Register } from '../../pages/Register/register'
import { ForgotPassword } from '../../pages/ForgotPassword/forgot-password'
import { ResetPassword } from '../../pages/ResetPassword/reset-password'
import { Profile } from '../../pages/Profile/profile'
import { Page404 } from '../../pages/404/page-404'

export const App = () => (
  <>
    <AppHeader/>
    <Routes>
      <Route path="/login" element={<Login />} exact={true} />
      <Route path="/register" element={<Register />} exact={true} />
      <Route path="/forgot-password" element={<ForgotPassword />} exact={true} />
      <Route path="/reset-password" element={<ResetPassword />} exact={true} />
      <Route path="/profile" element={<Profile />} exact={true} />
      <Route path="/" element={<Main/>} exact={true} />
      <Route path="*" element={<Page404 />} exact={true} />
    </Routes>
    <Modals/>
  </>
)
