import React, { useState } from 'react';
import styles from './STSearch.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import STIcon from './STIcon';

type STSearchProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void; // gọi khi người dùng nhấn Enter
  enable?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const STSearch: React.FC<STSearchProps> = ({
  value = '',
  placeholder = 'Search',
  onChange,
  onSearch,
  enable = true,
  className = '',
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Bắt sự kiện nhấn chữ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    console.log('Search', e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch?.(value);
  };

  return (
    <div className={`${styles.body} ${className} ${isFocused ? styles.focused : ''}`} style={style}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={!enable}
        className={`${styles.input} ${!enable ? styles.disabled : ''}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {/* <span className={styles.icon} onClick={() => enable && onSearch?.(value)}> */}
      <STIcon style={{ color: 'var(--color-border)' }} icon="fa-solid fa-magnifying-glass" />
      {/* </span> */}
    </div>
  );
};

export default React.memo(STSearch);
