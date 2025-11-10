import { useEffect, useState } from 'react';
import styles from './STInput.module.scss';
import { useStyles } from '@/hooks/useStyle';

type STInputProps = {
  placeholder?: string;
  value?: string;
  className?: string;
  enable?: boolean;
  textarea?: boolean;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
};

const STInput = ({
  placeholder,
  value,
  className,
  textarea = false,
  enable = true,
  onChange,
}: STInputProps) => {
  const theme = useStyles();

    console.log('data', value);


  // Gán màu
  useEffect(() => {
    document.documentElement.style.setProperty('--focus-border', theme.primary);
  }, [theme]);

  // Hàm bắt sư kiện nhậm
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={styles.body}>
      {textarea ? (
        <textarea
          className={`${styles.textarea} ${className} ${!enable && styles.enable}`}
          placeholder={placeholder && ''}
          value={value ?? ''}
          disabled={!enable}
          onChange={handleChange}
        />
      ) : (
        <input
          className={`${styles.input} ${className} ${!enable && styles.enable}`}
          placeholder={placeholder && ''}
          value={value ?? ''}
          disabled={!enable}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default STInput;
