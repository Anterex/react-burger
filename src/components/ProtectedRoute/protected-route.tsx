import { Navigate, useLocation } from 'react-router-dom'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { authorizationSelector } from '../../services/slices/auth'

interface ProtectedRouteTypes {
  children: any
  onlyAuth?: boolean
}

export const ProtectedRoute: FC<ProtectedRouteTypes> = ({ children, onlyAuth = false }) => {
  const { authenticated } = useSelector(authorizationSelector)
  const location = useLocation()

  if (!onlyAuth && authenticated) {
    const fromPage: string = location.state?.from ?? '/'
    return <Navigate to={fromPage} />
  }
  if (onlyAuth && !authenticated) {
    return <Navigate to='/login' replace={true} state={{ from: location.pathname }}/>
  }

  return children
}
