import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '@/features/auth/pages/LoginPage';
import UserPage from '@/features/users/pages/UserPage';
import SettingPage from '@/features/settings/pages/SettingPage';
import MainLayout from '@/components/layouts/MainLayout';

import { authLoader, guestOnlyLoader } from './loaders';
// import { logoutAction } from "./actions";
import HomePage from '@/features/users/pages/Home';
import ErrorPage from '@/components/layouts/errorPage';
import { logoutAction } from './action';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    loader: guestOnlyLoader,
  },

  // PROTECTED LAYOUT
  {
    path: '/',
    loader: authLoader,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'setting', element: <SettingPage /> },
    ],
  },

  // LOGOUT
  {
    path: "/logout",
    action: logoutAction,
  },

  // INFO - page độc lập
  // {
  //   path: '/info',
  //   element: <SettingPage />,
  //   errorElement: <ErrorPage />,
  // },

  // 404 fallback
  {
    path: '*',
    element: <h1>404 - Không tìm thấy trang</h1>,
  },
]);
