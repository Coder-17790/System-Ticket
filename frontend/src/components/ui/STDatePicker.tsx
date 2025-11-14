import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './STDatePicker.module.scss';

type STDatePickerProps = {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  enable?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  color?: 'text' | 'primary' | 'secondary' | 'danger';
  className?: string;
  style?: React.CSSProperties;
  dateFormat?: 'dd/MM/yyyy' | 'dd-MM-yyyy';
};

const STDatePicker: React.FC<STDatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  minDate,
  maxDate,
  enable = true,
  variant = 'default',
  color = 'text',
  className = '',
  style,
  dateFormat = 'dd/MM/yyyy',
}) => {
  const handleChange = (date: Date | null) => {
    onChange?.(date);
  };

  return (
    <div className={`${styles.body} ${className}`} style={style}>
      {label && <label className={styles.label}>{label}</label>}

      <DatePicker
        selected={value}
        onChange={handleChange}
        placeholderText={placeholder}
        dateFormat={dateFormat}
        className={`${styles.input} ${styles[variant]} ${styles[color]} ${
          !enable ? styles.disabled : ''
        }`}
        minDate={minDate}
        maxDate={maxDate}
        disabled={!enable}
        popperPlacement="top-start"
        portalId="root" // ✅ render ra ngoài layout
      />
    </div>
  );
};

export default React.memo(STDatePicker);
