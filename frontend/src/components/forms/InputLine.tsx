import STInput from '@/components/ui/STInput';
import STText from '@/components/ui/STText';
import styles from './InputLine.module.scss';
import STDatePicker from '@/components/ui/STDatePicker';
import STComboBox, { OptionCBB } from '@/components/ui/STComboBox';

// Component hiển thị thông tin người dùng theo dòng
export const InfoLine = ({
  label,
  value,
  required = false,
  enable = true,
  type = 'text',
  styleInput,
  style,
  onChange,
}: {
  label: string;
  value?: string | number | boolean;
  required?: boolean;
  enable?: boolean;
  type?: 'text' | 'textarea' | 'date';
  style?: React.CSSProperties;
  styleInput?: React.CSSProperties;
  onChange?: (str: string) => void;
}) => {
  return (
    <div style={style}>
      <div style={{ display: 'flex' }}>
        <STText block className={styles.label}>
          {`${label}: `}
        </STText>
        {required && (
          <STText variant="bold" color="danger">
            *
          </STText>
        )}
      </div>
      <STInput
        value={String(value)}
        enable={enable}
        textarea={type === 'textarea'}
        style={styleInput}
        onChange={onChange}
      />
    </div>
  );
};

// Component hiển thị thông tin ngày tháng
export const InfoDateLine = ({
  label,
  value,
  required = false,
  enable = true,
  onChange,
  style,
}: {
  label: string;
  value?: Date | null;
  required?: boolean;
  enable?: boolean;
  style?: React.CSSProperties;
  styleInput?: React.CSSProperties;
  onChange?: (date: Date | null) => void;
}) => {
  return (
    <div style={style}>
      <div style={{ display: 'flex' }}>
        <STText block className={styles.label}>
          {`${label}: `}
        </STText>
        {required && (
          <STText variant="bold" color="danger">
            *
          </STText>
        )}
      </div>
      <STDatePicker value={value} onChange={onChange} dateFormat="dd/MM/yyyy" enable={enable} />
    </div>
  );
};

// Component hiển thị thông tin ngày tháng
export const InfoComboBoxLine = ({
  label,
  value,
  option,
  enable = true,
  onChange,
  style,
}: {
  label: string;
  option: OptionCBB[];
  value?: string | null;
  enable?: boolean;
  style?: React.CSSProperties;
  onChange?: (value: string | number | null) => void;
}) => {
  return (
    <div style={style}>
      <STText block className={styles.label}>
        {label}:
      </STText>
      <STComboBox options={option} disabled={!enable} onChange={(str) => onChange?.(str)} value={value} />
    </div>
  );
};
