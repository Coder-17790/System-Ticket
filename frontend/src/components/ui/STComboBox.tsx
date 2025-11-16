import React, { useState, useEffect, useRef } from 'react';
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
  className?: string;
  style?: React.CSSProperties;
};

const STComboBox: React.FC<STComboBoxProps> = ({
  options,
  value,
  onChange,
  placeholder = 'None',
  disabled = false,
  className = '',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const comboRef = useRef<HTMLDivElement>(null); // ref cho combobox

  const handleSelect = (val: string | number) => {
    onChange?.(val);
    setIsOpen(false); // tự đóng khi chọn xong
  };

  // xử lý click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (comboRef.current && !comboRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let selectedLabel: string | number = placeholder;

  if (value !== '' && value !== null && value !== undefined) {
    const found = options.find((opt) => opt.value === value);
    selectedLabel = found ? found.label : value;
  }

  return (
    <div
      ref={comboRef}
      className={`${styles.combobox} ${className} 
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
              key={opt.value}
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
