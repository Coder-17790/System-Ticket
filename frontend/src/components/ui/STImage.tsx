import { images } from '@/assets/images';
import React, { useEffect, useState } from 'react';
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
  domain?: boolean;
};

const STImage = ({
  source,
  displaySrc = images.errorImage,
  alt = '',
  size = 10,
  onClick,
  className = '',
  style,
  domain = true,
}: STImageProps) => {
  // state giữ src thực tế dùng cho <img>
  const [imgSrc, setImgSrc] = useState<string>(
    source ? `${domain ? import.meta.env.VITE_BACKEND_URL : ''}${source}` : displaySrc
  );

  // Nếu props source / displaySrc / domain đổi → update lại imgSrc
  useEffect(() => {
    if (source) {
      setImgSrc(`${domain ? import.meta.env.VITE_BACKEND_URL : ''}${source}`);
    } else {
      setImgSrc(displaySrc);
    }
  }, [source, displaySrc, domain]);
  // Khi ảnh bị lỗi
  const handleError: React.ReactEventHandler<HTMLImageElement> = () => {
    // Tránh loop vô hạn: chỉ set fallback nếu chưa phải là fallback
    if (imgSrc !== displaySrc) {
      setImgSrc(displaySrc);
    }
  };

  return (
    <div>
      <img
        src={imgSrc}
        alt={alt}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          ...style,
        }}
        className={`${styles.image} ${className} ${onClick ? styles.clickable : ''}`}
        onClick={onClick}
        onError={handleError}
      />
    </div>
  );
};

export default STImage;
