import styles from './CardInfo.module.scss';
import { User } from '@/types';

type CardInfoProps = {
  info: User;
};

const CardInfo = ({}: CardInfoProps) => {
  return <div className={styles.body}></div>;
};

export default CardInfo;
