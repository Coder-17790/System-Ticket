import { useStyles } from '@/hooks/useStyle'; // hook trả về theme.primary chẳng hạn
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { router } from './routes';
import { NotificationProvider } from './providers/NotificationProvider';

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
    <NotificationProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </NotificationProvider>
  );
}

export default App;
