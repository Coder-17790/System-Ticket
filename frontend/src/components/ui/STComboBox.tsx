import React, { useState } from 'react';
import styles from './STComboBox.module.scss';
import STText from './STText';

export type OptionCBB = {
  label: string;
  value: string | number;
};

type STComboBoxProps = {
  options: OptionCBB[];
  value?: string | number | null;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: 'primary' | 'danger';
  className?: string;
  style?: React.CSSProperties;
};

const STComboBox: React.FC<STComboBoxProps> = ({
  options,
  value,
  onChange,
  placeholder = 'None',
  disabled = false,
  variant = 'primary',
  className = '',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log('isOpen', isOpen);

  const handleSelect = (val: string | number) => {
    onChange?.(val);
  };

  let selectedLabel: string | number = placeholder;

  if (value !== '' && value !== null && value !== undefined) {
    const found = options.find((opt) => opt.value === value);
    selectedLabel = found ? found.label : value;
  }

  return (
    <div
      className={`${styles.combobox} ${styles[variant]} ${className} 
              ${disabled ? styles.disabled : ''} 
              ${isOpen ? styles.focused : ''}`}
      style={style}
      onClick={() => !disabled && setIsOpen((prev) => !prev)}
    >
      <STText className={styles.selected}>{selectedLabel}</STText>
      <STText className={styles.arrow}>{isOpen ? '▲' : '▼'}</STText>

      {isOpen && (
        <div className={styles.options}>
          {options.map((opt) => (
            <STText
              style={{ display: 'block' }}
              className={`${styles.option} ${opt.value === value ? styles.active : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </STText>
          ))}
        </div>
      )}
    </div>
  );
};

export default STComboBox;
