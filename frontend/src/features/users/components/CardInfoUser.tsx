import { User } from '@/types';
import styles from './CardInfoUser.module.scss';
import STText from '@/components/ui/STText';
import utilt from '@/utils';
import { useTranslation } from 'react-i18next';

type CardInfoUserProps = {
  className?: string;
  styleCSS?: React.CSSProperties;
  info?: User;
};

// Trường thông tin
const InfoLine = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className={styles.infoLine}>
      <STText variant="label">{label}</STText>
      <STText>{value}</STText>
    </div>
  );
};

const CardInfoUser = ({ className, styleCSS, info }: CardInfoUserProps) => {
  const { t } = useTranslation();

  return (
    <div style={styleCSS} className={className ? className : styles.body}>
      <div className={styles.wrap}>
        <InfoLine label={t('profile.fullName')} value={info?.fullName || ''} />
        <InfoLine label={t('profile.email')} value={info?.email || ''} />
        <InfoLine label={t('profile.nickname')} value={info?.title || ''} />

        <InfoLine label={t('profile.userName')} value={info?.username || ''} />
        <InfoLine label={t('profile.passWord')} value={info?.password || ''} />
        <InfoLine label={t('profile.nation')} value={info?.nation.name || ''} />

        <InfoLine label={t('profile.phone')} value={info?.phone ?? ''} />
        <InfoLine
          label={t('profile.birthday')}
          value={utilt.format.fomatData_1(info?.dateOfBirth || '')}
        />
        <InfoLine label={t('profile.gender')} value={info?.gender || ''} />

        <InfoLine
          label={t('profile.twoFaEnabled')}
          value={info?.twoFaEnabled ? t('button.on') : t('button.off')}
        />
        <InfoLine
          label={t('profile.createdAt')}
          value={utilt.format.fomatData_1(info?.createdAt || '')}
        />
        <InfoLine
          label={t('profile.updatedAt')}
          value={utilt.format.fomatData_1(info?.updatedAt || '')}
        />
      </div>

      <div className={styles.divBio}>
        <STText style={{ marginBottom: 10 }} variant="label">
          {t('profile.description')}
        </STText>
        <div className={styles.borBio}>
          <STText>{info?.bio || ''}</STText>
        </div>
      </div>
    </div>
  );
};

export default CardInfoUser;
