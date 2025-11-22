import STImage from '@/components/ui/STImage';
import { User } from '@/types';
import styles from './CardInfoMainUser.module.scss';
import STText from '@/components/ui/STText';

type CardInfoMainUserProps = {
  info?: User;
  className?: string;
  styleCSS?: React.CSSProperties;
};

const InfoLine = ({ label, value }: { label?: string; value?: string | null }) => {
  return (
    <div className={styles.infoLine}>
      <STText variant="label">{label}</STText>
      <STText>{value ?? 'null'}</STText>
    </div>
  );
};

const CardInfoMainUser = ({ info, className, styleCSS }: CardInfoMainUserProps) => {
  return (
    <div style={styleCSS} className={`${styles.body} ${className ? className : ''}`}>
      <div className={styles.divAvatar}>
        <STImage source={info?.avatar} className={styles.avatar} size={150} alt="Avatar" />
      </div>
      <div className={styles.divInfo}>
        <div>
          <STText className={styles.fullName} variant="title" color="primary">
            {info?.fullName}
          </STText>
        </div>
        <STText
          variant="highlight"
          color="secondary"
          style={{ marginBottom: '10px' }}
        >{`${info?.role} | ${info?.position}`}</STText>
        <div className={styles.divInfoLine}>
          <InfoLine label="Email" value={info?.email} />
          <div style={{ border: `1px solid ${'var(--color-border)'}` }} />{' '}
          <InfoLine label="SDT" value={info?.phone} />
          <div style={{ border: `1px solid ${'var(--color-border)'}` }} />{' '}
          <InfoLine label="Giới tính" value={info?.gender} />
        </div>
      </div>
    </div>
  );
};

export default CardInfoMainUser;
