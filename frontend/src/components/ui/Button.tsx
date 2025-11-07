import React from 'react';
import styles from './Button.module.scss';

type STButtonProps = {
  label?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

const STButton: React.FC<STButtonProps> = ({
  label = 'Button',
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default STButton;
