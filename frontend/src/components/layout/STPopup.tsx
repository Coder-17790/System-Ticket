// STPopup.tsx
import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import styles from './STPopup.module.scss';

export type STPopupRef = {
  open: () => void;
  close: () => void;
};

type STPopupProps = {
  children: React.ReactNode;
  buttonStyle?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  close?: () => void;
  access?: () => void;
  style?: React.CSSProperties;
};

const STPopup = forwardRef<STPopupRef, STPopupProps>(
  ({ children, buttonStyle = 'primary', className = '', style, close, access }, ref) => {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false); // ⚡ Thêm trạng thái để có hiệu ứng đóng

    const openPopup = useCallback(() => {
      setClosing(false);
      setOpen(true);
    }, []);

    const closePopup = useCallback(() => {
      setClosing(true);
      // Delay 400ms cho animation slideDown
      setTimeout(() => setOpen(false), 400);
    }, []);

    useImperativeHandle(ref, () => ({
      open: openPopup,
      close: closePopup,
    }));

    if (!open) return null;

    return (
      <div
        className={`${styles.overlay} ${closing ? styles.fadeOut : styles.fadeIn} ${className}`}
        onClick={closePopup}
      >
        <div
          className={`${styles.popup} ${closing ? styles.slideDown : styles.slideUp}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.message} style={style}>
            {children}
          </div>

          <div className={styles.divButton}>
            {close && (
              <button className={`${styles.button} ${styles[buttonStyle]}`} onClick={closePopup}>
                Xác nhận
              </button>
            )}
            {access && (
              <button className={`${styles.button} ${styles[buttonStyle]}`} onClick={closePopup}>
                Đóng
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default STPopup;
