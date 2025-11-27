import { User } from '@/types';
import styles from './CardInfoUser.module.scss';
import STText from '@/components/ui/STText';
import utilt from '@/utils';

type CardInfoUserProps = {
  className?: string;
  styleCSS?: React.CSSProperties;
  info?: User;
};

// Trường thông tin
const InfoLine = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={styles.infoLine}>
      <STText variant="label">{label}</STText>
      <STText>{value}</STText>
    </div>
  );
};

const CardInfoUser = ({ className, styleCSS, info }: CardInfoUserProps) => {
  return (
    <div style={styleCSS} className={className ? className : styles.body}>
      <div className={styles.wrap}>
        <InfoLine label="Họ và tên" value={info?.fullName || ''} />
        <InfoLine label="Email" value={info?.email || ''} />

        <InfoLine label="Biệt danh" value={info?.title || ''} />
        <InfoLine label="Ngôn ngữ" value={info?.language || ''} />

        <InfoLine label="SĐT" value={info?.phone ?? ''} />
        <InfoLine label="Ngày sinh" value={utilt.format.fomatData_1(info?.dateOfBirth || '')} />

        <InfoLine label="Giới tính" value={info?.gender || ''} />
        <InfoLine label="Địa chỉ" value={info?.address || ''} />

        <InfoLine label="Vị trí" value={info?.position || ''} />
        <InfoLine label="Vai trò" value={info?.role || ''} />

        <InfoLine label="Ngày tạo" value={utilt.format.fomatData_1(info?.createdAt || '')} />
        <InfoLine label="Ngày cập nhật" value={utilt.format.fomatData_1(info?.updatedAt || '')} />
      </div>
      <div className={styles.divBio}>
        <STText style={{ marginBottom: 10 }} variant="label">
          Miêu tả
        </STText>
        <div className={styles.borBio}>
          <STText>{info?.bio || ''}</STText>
        </div>
      </div>
    </div>
  );
};

export default CardInfoUser;
