import { User } from '@/types';
import styles from './CardUser.module.scss';
import { fomatData_1 } from '@/utils';
import STButton from '@/components/ui/Button';
import { useDeleteUserMutation } from '../hooks/useUsers';
import { useStyles } from '@/hooks/useStyle';
import { icons } from '@/assets/icons';
import STIcon from '@/components/ui/STIcon';
import STText from '@/components/ui/STText';

type CardUserProps = {
  info?: User;
  getInfoUser?: (user: User) => void;
  className?: string;
  sytle?: React.CSSProperties;
};

const CardUser = ({ info, getInfoUser, className }: CardUserProps) => {
  const deleteUserMutation = useDeleteUserMutation();
  const theme = useStyles();

  // Component hiển thị thông tin người dùng theo dòng
  const InfoItem = ({ label, value }: { label: string; value: string | number | boolean }) => {
    return (
      <div className={`${styles.info} ${className} `}>
        <span className={styles.infoLabel}>{label}:</span>
        <span>{value}</span>
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
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <STText
            className={styles.cardTitle}
            style={{ color: theme.secondary }}
            onClick={() => getInfoUser && getInfoUser?.(info!)}
          >
            {info?.fullName}
          </STText>
          <STIcon iconName={icons.delete} size={20} onClick={handleDelete} />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardColumn}>
            <InfoItem label="Email" value={info?.email || ''} />
            <InfoItem label="Trạng thái" value={info?.isActive || ''} />
          </div>
          <div className={styles.cardColumn}>
            <InfoItem label="Ngày tạo" value={info ? fomatData_1(info.createdAt) : ''} />
            <InfoItem label="Ngày cập nhật" value={info ? fomatData_1(info.updatedAt) : ''} />
          </div>
        </div>
      </div>
      {/* <div className={styles.cardColumnButon}>
        <STButton label="Cập nhật" />
        <STButton
          label={deleteUserMutation.isPending ? 'Đang xoá...' : 'Xoá'}
          variant="danger"
          onClick={handleDelete}
          disabled={!info?.id || deleteUserMutation.isPending}
        />
      </div> */}
    </div>
  );
};

export default CardUser;
