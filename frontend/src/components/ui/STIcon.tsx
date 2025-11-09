import { icons } from '@/assets/icons';
import styles from './STIcon.module.scss';

type STIconProps = {
  iconName?: string;
  onClick?: () => void;
  size?: number;
};

const STIcon = ({ iconName = icons.warning, onClick, size = 30 }: STIconProps) => {
  return (
    <div style={{ height: size, width: size }} className={styles.body}>
      <img src={iconName} alt="icon" onClick={onClick} className={styles.icon} />
    </div>
  );
};

export default STIcon;
