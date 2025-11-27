import STImage from '@/components/ui/STImage';
import { User } from '@/types';
import styles from './CardInfoMainUser.module.scss';
import STText from '@/components/ui/STText';
import STIcon from '@/components/ui/STIcon';
import { icons } from '@/assets/icons';

type CardInfoMainUserProps = {
  info?: User;
  className?: string;
  styleCSS?: React.CSSProperties;
  onClick?: (user: User) => void;
};

const InfoLine = ({ label, value }: { label?: string; value?: string | null }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ border: `1px solid ${'var(--color-border)'}` }} />{' '}
      <div className={styles.infoLine}>
        <STText variant="label">{label}</STText>
        <STText>{value ?? 'null'}</STText>
      </div>
    </div>
  );
};

const CardInfoMainUser = ({ info, className, styleCSS, onClick }: CardInfoMainUserProps) => {
  return (
    <div style={styleCSS} className={`${styles.body} ${className ? className : ''}`}>
      <div className={styles.divAvatar}>
        <STImage source={info?.avatar} className={styles.avatar} size={150} alt="Avatar" />
      </div>
      <div className={styles.divInfo}>
        <div className={styles.devInfoTop}>
          <div>
            <div>
              <STText className={styles.fullName} variant="title" color="primary">
                {info?.fullName || 'Name'}
              </STText>
            </div>
            <STText
              variant="highlight"
              color="secondary"
            >{`${info?.role} | ${info?.position}`}</STText>
          </div>
          <STIcon size="lg" icon={icons.update} onClick={() => onClick?.(info as User)} />
        </div>
        <div className={styles.divInfoLine}>
          <InfoLine label="Email" value={info?.email} />
          <InfoLine label="SDT" value={info?.phone} />
          <InfoLine label="Giới tính" value={info?.gender} />
        </div>
      </div>
    </div>
  );
};

export default CardInfoMainUser;
