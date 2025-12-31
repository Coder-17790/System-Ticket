import { createBrowserRouter, Navigate } from 'react-router-dom';
import { authLoader, guestOnlyLoader } from './loaders';
import { logoutAction } from './action';

import MainLayout from '@/components/layouts/MainLayout';
import ErrorPage from '@/components/layouts/errorPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import UserPage from '@/features/users/pages/UserPage';
import SettingPage from '@/features/settings/pages/SettingPage';
import HomePage from '@/features/users/pages/Home';
import Register from '@/features/auth/pages/Register';

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      // 1. PUBLIC ROUTES (Dành cho khách)
      {
        // element: <HomePage />, // Có thể thay bằng AuthLayout nếu cần
        loader: guestOnlyLoader,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <Register /> },

          // { path: 'register', element: <RegisterPage /> },
        ],
      },

      // 2. PROTECTED ROUTES (Cần đăng nhập)
      {
        path: '/',
        element: <MainLayout />,
        loader: authLoader,
        children: [
          { index: true, element: <HomePage /> },
          { path: '/user', element: <UserPage /> },
          { path: '/setting', element: <SettingPage /> },
        ],
      },

      // 3. ACTIONS & UTILS
      {
        path: 'logout',
        action: logoutAction,
      },

      // 4. FALLBACKS
      {
        path: '404',
        element: <h1>404 - Không tìm thấy trang</h1>,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);
