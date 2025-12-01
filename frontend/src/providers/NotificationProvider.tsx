import { createContext, ReactNode, useContext, useState } from 'react';
import styles from './NotificationProvider.module.scss';
import STText from '@/components/ui/STText';

export type NotifyType = 'success' | 'error' | 'warning' | 'info';

export type NotifyItem = {
  id: number;
  type: NotifyType;
  message: string;
  isClosing?: boolean;
};

export type NotifyContextType = {
  notify: (msg: string, type?: NotifyType) => void;
};

const NotificationContext = createContext<NotifyContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [list, setList] = useState<NotifyItem[]>([]);

  const notify = (message: string, type: NotifyType = 'info') => {
    const id = Date.now();

    setList((prev) => {
      // Nếu quá 4 toast → xoá cái đầu tiên
      const newList = prev.length >= 4 ? prev.slice(1) : prev;

      // Thêm toast mới vào cuối
      return [...newList, { id, type, message }];
    });

    // Bắt đầu đóng sau 3 giây
    setTimeout(() => {
      setList((prev) => prev.map((n) => (n.id === id ? { ...n, isClosing: true } : n)));

      // Remove thật sau khi animation đóng xong (300ms)
      setTimeout(() => {
        setList((prev) => prev.filter((n) => n.id !== id));
      }, 100);
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <div className={styles.wrapper}>
        {list.map((n) => (
          <div
            key={n.id}
            className={`
                ${styles.toast}
                ${styles[n.type]}
                ${n.isClosing ? styles.closing : ''}
              `}
          >
            <STText variant="bold" style={{ color: `var(--color-white` }}>
              {n.message}
            </STText>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotify must be inside NotificationProvider');
  return ctx;
};
