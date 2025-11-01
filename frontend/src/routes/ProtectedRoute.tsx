import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />
}

export default ProtectedRoute
