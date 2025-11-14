import React from 'react';
import styles from './STInput.module.scss';

type STInputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  textarea?: boolean;
  enable?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  color?: 'default' | 'primary' | 'secondary' | 'danger';
  className?: string;
  style?: React.CSSProperties;
};

const STInput: React.FC<STInputProps> = ({
  value = '',
  placeholder = '',
  onChange,
  textarea = false,
  enable = true,
  variant = 'default',
  color = 'default',
  className = '',
  style,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const commonProps = {
    className: `${styles.input} ${styles[variant]} ${styles[color]} ${className} ${
      !enable ? styles.disabled : ''
    }`,
    placeholder,
    value,
    disabled: !enable,
    onChange: handleChange,
    style,
  };

  return (
    <div className={styles.body}>
      {textarea ? <textarea {...commonProps} /> : <input {...commonProps} />}
    </div>
  );
};

export default React.memo(STInput);
