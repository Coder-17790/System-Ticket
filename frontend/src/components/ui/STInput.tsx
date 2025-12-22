import React from 'react';
import styles from './STInput.module.scss';

type STInputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  textarea?: boolean;
  enable?: boolean;
  color?: 'default' | 'primary' | 'secondary' | 'danger';
  className?: string;
  style?: React.CSSProperties;
  type?: React.HTMLInputTypeAttribute;
};

const STInput: React.FC<STInputProps> = ({
  value = '',
  placeholder = '',
  onChange,
  textarea = false,
  enable = true,
  color = 'default',
  className = '',
  type = 'text',
  style,
}) => {
  // Sự kiện nhấn
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const commonProps = {
    className: `${textarea ? styles.textarea : styles.input} ${styles[color]} ${className} ${
      !enable ? styles.disabled : ''
    }`,
    placeholder,
    value,
    disabled: !enable,
    onChange: handleChange,
    type: type,
    style: style,
  };

  return (
    <div className={styles.body}>
      {textarea ? <textarea {...commonProps} /> : <input {...commonProps} />}
    </div>
  );
};

export default React.memo(STInput);
