import styles from './STText.module.scss';
import { useStyles } from '@/hooks/useStyle';

type STTextProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const STText = ({ children, style, className, onClick }: STTextProps) => {
  const theme = useStyles();
  return (
    <div className={styles.body}>
      <span
        onClick={onClick}
        style={{ color: theme.text, cursor: onClick ? 'pointer' : 'default', ...style }}
        className={`${styles.text} ${className || ''}`}
      >
        {children}
      </span>
    </div>
  );
};

export default STText;
