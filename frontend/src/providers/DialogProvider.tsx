import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import styles from './DialogProvider.module.scss';
import STText from '@/components/ui/STText';
import STButton from '@/components/ui/STButton';
import STIcon from '@/components/ui/STIcon';
import { useTranslation } from 'react-i18next';

export type DialogType = {
  notify: ({
    msg,
    onClose,
    onSuccess,
  }: {
    msg: string;
    onClose?: () => void;
    onSuccess?: () => void;
  }) => void;
};

const DialogContext = createContext<DialogType | null>(null);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onCloseCallbackRef = useRef<(() => void) | null>(null);
  const onSuccessCallbackRef = useRef<(() => void) | null>(null);
  const { t } = useTranslation();

  // Hàm hiển thị thông báo và nhận vào callback khi đóng
  const notify = ({
    msg,
    onClose,
    onSuccess,
  }: {
    msg: string;
    onClose?: () => void;
    onSuccess?: () => void;
  }) => {
    setText(msg || 'Thông báo không rõ');
    setIsOpen(true);
    onCloseCallbackRef.current = onClose || null;
    onSuccessCallbackRef.current = onSuccess || null;
  };

  // Hàm khi nhấn thoát
  const clickClose = () => {
    setIsOpen(false);
    if (onCloseCallbackRef.current) {
      onCloseCallbackRef.current();
      onCloseCallbackRef.current = null;
    }
  };

  // Hàm khi nhấn "Có"
  const onClickAccess = () => {
    setIsOpen(false);
    if (onSuccessCallbackRef.current) {
      onSuccessCallbackRef.current();
      onSuccessCallbackRef.current = null;
    }
  };

  return (
    <DialogContext.Provider value={{ notify }}>
      {children}

      {/* Hiển thị hộp thoại nếu trạng thái `isOpen` là true */}
      {isOpen && (
        <div className={styles.wrapper}>
          <div className={styles.popup}>
            <div className={styles.divHeader}>
              <STIcon className="fa-solid fa-x" onClick={clickClose} />
            </div>
            <div className={styles.divContent}>
              <STText>{text}</STText>
            </div>
            <div className={styles.divButon}>
              <STButton className={styles.btNo} label={t('button.no')} onClick={clickClose} />
              <STButton className={styles.btYes} label={t('button.yes')} onClick={onClickAccess} />
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be inside DialogProvider');
  return ctx;
};
