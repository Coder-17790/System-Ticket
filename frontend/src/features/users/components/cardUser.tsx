import { User } from '@/types';
import styles from './CardUser.module.scss';
import { fomatData_1 } from '@/utils';
import STButton from '@/components/ui/Button';
import { useDeleteUserMutation } from '../hooks/useUsers';
import { useColors } from '@/hooks/useStyle';
import { icons } from '@/assets/icons';
import STIcon from '@/components/ui/STIcon';

type CardUserProps = {
  info?: User;
};

const CardUser = ({ info }: CardUserProps) => {
  const deleteUserMutation = useDeleteUserMutation();
  const theme = useColors();

  // Component hiển thị thông tin người dùng theo dòng
  const InfoItem = ({ label, value }: { label: string; value: string | number | boolean }) => {
    return (
      <div className={styles.info}>
        <span className={styles.infoLabel}>{label}:</span>
        <span>{value}</span>
      </div>
    );
  };

  // Xoá 1 user
  const handleDelete = () => {
    if (!info?.id) return; // tránh gọi mutate khi chưa có id
    deleteUserMutation.mutate(info.id);
    deleteUserMutation.isSuccess;
  };

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.cardHeader}>
          <h3 style={{ color: theme.primary }} className={styles.cardTitle}>
            {info?.fullName}
          </h3>
          <STIcon iconName={icons.delete} />
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
