import React from 'react';
import styles from './STText.module.scss';

type STTextProps = {
  children?: React.ReactNode;
  variant?: 'body' | 'title' | 'caption' | 'link' | 'highlight' | 'bold';
  color?: 'default' | 'primary' | 'secondary' | 'danger';
  block?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties; // chỉ dùng cho chỉnh nhẹ như margin
};

const STText: React.FC<STTextProps> = ({
  children,
  variant = 'body',
  color = 'default',
  onClick,
  block = false,
  className = '',
  style,
}) => {
  return (
    <span
      onClick={onClick}
      style={style}
      className={`${styles.text} ${block ? styles.block : ''} ${styles[variant]} ${styles[color]} ${className} ${
        onClick ? styles.clickable : ''
      }`}
    >
      {children}
    </span>
  );
};

export default STText;
