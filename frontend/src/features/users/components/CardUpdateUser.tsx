import { InfoComboBoxLine, InfoDateLine, InfoLine } from '@/components/forms/InputLine';
import STButton from '@/components/ui/STButton';
import STText from '@/components/ui/STText';
import { languageOption, positionOption, roleOption, User } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useUpdateUserMutation } from '../hooks/useUsers';
import styles from './CardUpdateUser.module.scss';
import { useTranslation } from 'react-i18next';
import AvartarInput from '@/components/forms/AvartarInput';

type CardInfoProps = {
  info?: User;
  className?: string;
};

const CardInfo = ({ info, className }: CardInfoProps) => {
  const [data, setData] = useState<User>(info || ({} as User));
  const useUpdate = useUpdateUserMutation();
  const { t } = useTranslation();

  // Chạy lần đầu
  useEffect(() => {
    if (info) setData(info);
  }, [info]);

  // Cập nhật data từng hàng
  const updateUserField = useCallback(<K extends keyof User>(field: K, value: User[K]) => {
    setData((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, []);

  // Cập nhật user
  const handleUpdate = (info: User) => {
    useUpdate.mutate(info);
    useUpdate.isSuccess;
  };

  return (
    <div className={`${styles.body} ${className || ''}`}>
      <STText variant="title" className={styles.title}>
        {t('userPage.updateUser')}
      </STText>
      <div className={styles.divAvatar}>
        <AvartarInput source={data?.avatar || ''} />
      </div>
      <div className={styles.content}>
        <InfoLine
          label={t('profile.fullName')}
          value={data?.fullName || ''}
          onChange={(str) => updateUserField('fullName', str)}
        />
        <InfoLine
          label={t('profile.email')}
          value={data?.email || ''}
          required
          onChange={(str) => updateUserField('email', str)}
        />

        <InfoLine
          label={t('profile.nickname')}
          value={data?.title || ''}
          onChange={(str) => updateUserField('title', str)}
        />
        <InfoComboBoxLine
          option={languageOption}
          label={t('profile.language')}
          value={data?.language || ''}
          onChange={(str) => updateUserField('language', String(str) ?? '')}
        />

        <InfoLine
          label={t('profile.phone')}
          value={data?.phone ?? ''}
          onChange={(str) => setData((prev) => ({ ...prev, phone: str }))}
        />
        <InfoDateLine
          label={t('profile.birthday')}
          value={data?.dateOfBirth || null}
          onChange={(str) => {
            const newDate = str ? new Date(str) : undefined;
            updateUserField('dateOfBirth', newDate as Date);
          }}
        />

        <InfoLine
          label={t('profile.gender')}
          value={data?.gender || ''}
          onChange={(str) => updateUserField('gender', str)}
        />
        <InfoLine
          label={t('profile.address')}
          value={data?.address || ''}
          onChange={(str) => updateUserField('address', str)}
        />

        <InfoComboBoxLine
          option={positionOption}
          label={t('profile.position')}
          value={data?.position || ''}
          onChange={(str) => updateUserField('position', String(str) ?? '')}
        />
        <InfoComboBoxLine
          option={roleOption}
          label={t('profile.role')}
          value={data?.role || ''}
          onChange={(str) => updateUserField('role', String(str) ?? '')}
        />

        <InfoDateLine
          enable={false}
          label={t('profile.createdAt')}
          value={data?.createdAt || null}
          onChange={(str) => {
            const newDate = str ? new Date(str) : undefined;
            updateUserField('createdAt', newDate as Date);
          }}
        />
        <InfoDateLine
          enable={false}
          label={t('profile.updatedAt')}
          value={data?.updatedAt || null}
          onChange={(str) => {
            const newDate = str ? new Date(str) : undefined;
            updateUserField('updatedAt', newDate as Date);
          }}
        />
      </div>

      <InfoLine
        style={{ marginTop: 30 }}
        label={t('profile.description')}
        value={data?.bio || ''}
        styleInput={{ height: 100 }}
        type="textarea"
        onChange={(str) => updateUserField('bio', str)}
      />

      <div className={styles.buttonWrapper}>
        <STButton label={t('button.save')} onClick={() => handleUpdate(data)} />
      </div>
    </div>
  );
};

export default CardInfo;
