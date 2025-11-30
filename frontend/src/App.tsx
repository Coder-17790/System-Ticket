import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { router } from './routes';
import { useStyles } from '@/hooks/useStyle'; // hook trả về theme.primary chẳng hạn
import { useEffect } from 'react';
import UserPage from './features/users/pages/UserPage';

function App() {
  const theme = useStyles();

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

  return (
    <QueryProvider>
      <RouterProvider router={router} />
      {/* <UserPage /> */}
    </QueryProvider>
  );
}

export default App;
