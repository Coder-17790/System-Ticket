import { User } from '@/types';
import styles from './CardUser.module.scss';
import { useDeleteUserMutation } from '../hooks/useUsers';
import { icons } from '@/assets/icons';
import STIcon from '@/components/ui/STIcon';
import STText from '@/components/ui/STText';
import { useTranslation } from 'react-i18next';
import utilt from '@/utils';

type CardUserProps = {
  info?: User;
  getInfoUser?: (user: User) => void;
  className?: string;
  sytle?: React.CSSProperties;
  select?: boolean;
};

const CardUser = ({ info, getInfoUser, className, select }: CardUserProps) => {
  const deleteUserMutation = useDeleteUserMutation();
  const { t } = useTranslation();

  // Component hiển thị thông tin người dùng theo dòng
  const infoItem = (label: string, value: string | number | boolean) => {
    return (
      <div className={`${styles.info} ${className} `}>
        <STText variant="bold" className={styles.infoLabel}>
          {label}:
        </STText>
        <STText>{value}</STText>
      </div>
    );
  };

  // Xoá 1 user
  const handleDelete = () => {
    if (!info?.id) return; // tránh gọi mutate khi chưa có id
    deleteUserMutation.mutate(String(info.id));
    deleteUserMutation.isSuccess;
  };

  return (
    <div
      className={`${styles.card}  ${select ? styles.focus : ''}`}
      onClick={() => getInfoUser && getInfoUser?.(info!)}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <STText color="primary" variant="highlight">
            {info?.fullName}
          </STText>
          <STIcon icon={icons.delete} onClick={handleDelete} />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardColumn}>
            {infoItem(t('profile.email'), info?.email || '')}
            {/* {infoItem(t('profile.role'), info?.role || '')} */}
          </div>
          <div className={styles.cardColumn}>
            {infoItem(t('profile.createdAt'), info ? utilt.format.fomatData_1(info.createdAt) : '')}
            {infoItem(t('profile.updatedAt'), info ? utilt.format.fomatData_1(info.updatedAt) : '')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
