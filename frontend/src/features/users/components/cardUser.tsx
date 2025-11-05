import { User } from '@/types';
import styles from './CardUser.module.scss';

type CardUserProps = {
  info?: User;
};

const InfoItem = ({ label, value }: { label: string; value: string | number | boolean }) => {
  return (
    <div className={styles.info}>
      <span className={styles.infoLabel}>{label}:</span>
      <span>{value}</span>
    </div>
  );
};

const CardUser = ({ info }: CardUserProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{info?.fullName}</h3>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardColumn}>
          <InfoItem label="Email" value={info?.email || ''} />
          <InfoItem label="Trạng thái" value={info?.isActive || ''} />
        </div>

        <div className={styles.cardColumn}>
          <InfoItem
            label="Ngày tạo"
            value={info ? new Date(info.createdAt).toLocaleDateString() : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default CardUser;
