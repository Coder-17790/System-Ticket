import { DialogProvider } from '@/providers/DialogProvider';
import { NotificationProvider } from '@/providers/NotificationProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { ReactNode } from 'react';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <NotificationProvider>
        <DialogProvider>{children}</DialogProvider>
      </NotificationProvider>
    </QueryProvider>
  );
};

export default AppProvider;
