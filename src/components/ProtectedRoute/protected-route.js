import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
import { authorizationSelector } from '../../services/slices/auth'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children, onlyAuth = false }) => {
  const { authenticated } = useSelector(authorizationSelector)
  const location = useLocation()

  if (!onlyAuth && authenticated) {
    const fromPage = location.state?.from || '/'
    return <Navigate to={fromPage} />
  }
  if (onlyAuth && !authenticated) {
    return <Navigate to='/login' replace={true} state={{ from: location.pathname }}/>
  }

  return children
}
