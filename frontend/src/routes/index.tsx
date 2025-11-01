import { Route, Routes } from 'react-router-dom'
import Home from '../features/users/pages/Home'
import Login from '../features/auth/pages/Login'
import ProtectedRoute from './ProtectedRoute'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
