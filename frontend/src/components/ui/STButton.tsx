import React from 'react';
import styles from './STButton.module.scss';

type STButtonProps = {
  label?: string;
  onClick?: () => void;
  variant?: 'primary' | 'danger';
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const STButton: React.FC<STButtonProps> = ({
  label = 'Button',
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  style,
}) => {
  return (
    <button
      style={style}
      className={`${styles.button} ${styles[variant]} ${className} ${disabled ? styles.disabled : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default STButton;
