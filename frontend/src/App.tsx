import { useStyles } from '@/hooks/useStyle'; // hook trả về theme.primary chẳng hạn
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import AppProvider from './providers';
import { router } from './routes';
import { fetchUser } from './store/slices/userSlice';
import { useAppDispatch } from './hooks/useDispatch';

function App() {
  const theme = useStyles();
  const dispatch = useAppDispatch();

  // Gán biến màu toàn cục
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.color).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value as string);
    });
    Object.entries(theme.size).forEach(([key, value]) => {
      root.style.setProperty(`--size-${key}`, value as string);
    });
  }, [theme]);

  // useEffect(() => {
  //   // Vừa vào app là kiểm tra xem user là ai ngay
  //   dispatch(fetchUser());
  //   console.log('===========================Chạy lại');
  // }, [dispatch]);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
