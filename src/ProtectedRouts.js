import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
  const user = localStorage.getItem('profile')
  if (user) {
    return true
  } else {
    return false
  }
}

const ProtectedRoutes = () => {
  var session_token = localStorage.getItem('profile')

  const auth = useAuth()

  return auth ? (
    <Outlet />
  ) : session_token !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" />
  )
}

export default ProtectedRoutes