import { images } from '@/assets/images';
import React from 'react';
import styles from './STImage.module.scss';

type STImageProps = {
  /** Đường dẫn hình ảnh (vd: '/images/example.png') */
  source: string | undefined;
  displaySrc?: string;
  alt?: string;
  size?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const STImage = ({
  source,
  displaySrc = images.errorImage,
  alt = '',
  size = 10,
  onClick,
  className = '',
  style,
}: STImageProps) => {
  return (
    <div>
      <img
        src={source ? `${import.meta.env.VITE_BACKEND_URL}/public${source}` : displaySrc}
        alt={alt}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          ...style,
        }}
        className={`${styles.image} ${className} ${onClick ? styles.clickable : ''}`}
        onClick={onClick}
      />
    </div>
  );
};

export default STImage;
