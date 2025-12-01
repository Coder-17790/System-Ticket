import { icons } from '@/assets/icons';
import STIcon from '../ui/STIcon';
import STImage from '../ui/STImage';
import styles from './AvartarInput.module.scss';

type AvartarInputProps = {
  className?: string;
  styleCSS?: React.CSSProperties;
  source: string;
};

// Thêm avatar
const addAvatar = () => {};

const AvartarInput = ({ className, styleCSS, source }: AvartarInputProps) => {
  console.log('source', source);
  return (
    <div style={styleCSS} className={className ? className : styles.body}>
      <STImage source={source} className={styles.image} size={100} alt="Avatar" />
      <STIcon className={styles.addAvatar} size="lg" icon={icons.add} onClick={addAvatar}></STIcon>
    </div>
  );
};

export default AvartarInput;
