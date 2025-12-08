import React from 'react';
import styles from './STIcon.module.scss';

type STIconProps = {
  /** Tên icon hoặc đường dẫn hình ảnh (vd: 'fa-solid fa-user' hoặc '/icons/edit.png') */
  icon?: string;
  size?: number;
  rotate?: number;
  spin?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const STIcon = ({
  icon,
  size = 20,
  rotate,
  spin = false,
  onClick,
  className = '',
  style,
}: STIconProps) => {
  const rotateStyle = rotate ? { transform: `rotate(${rotate}deg)` } : {};

  // Kiểm tra xem icon có phải file ảnh không (.png, .jpg, .jpeg, .svg, .gif)
  const isImage = typeof icon === 'string' && /\.(png|jpg|jpeg|svg|gif)$/i.test(icon);

  // Nếu là ảnh thì render <img>
  if (isImage) {
    return (
      <img
        src={icon}
        // alt=""
        className={`${styles.icon} ${className} ${onClick ? styles.clickable : ''}`}
        style={{ ...style, width: size, height: size, ...rotateStyle }}
        onClick={onClick}
      />
    );
  }

  // Nếu là class FontAwesome hoặc tương tự
  return (
    <i
      className={`${icon} ${styles.icon} ${className} ${
        spin ? styles.spin : ''
      } ${onClick ? styles.clickable : ''}`}
      style={{ ...style, fontSize: size, ...rotateStyle }}
      onClick={onClick}
    />
  );
};

export default STIcon;
