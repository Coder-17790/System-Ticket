import { Route, Routes } from 'react-router-dom';
import Home from '../features/users/pages/Home';
import Login from '../features/auth/pages/Login';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import UserPage from '@/features/users/pages/UserPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="users" element={<UserPage />} />
      </Route>
    </Routes>
  );
};
