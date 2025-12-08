import { InfoComboBoxLine, InfoDateLine, InfoLine } from '@/components/forms/InputLine';
import STButton from '@/components/ui/STButton';
import STText from '@/components/ui/STText';
import { gender, genderOption, languageOption, positionOption, roleOption, User } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreateUserMutation } from '../hooks/useUsers';
import styles from './CardUpdateUser.module.scss';
import { useNotify } from '@/providers/NotificationProvider';
import { useTranslation } from 'react-i18next';
// import { number } from 'framer-motion';

type CardAddUserProps = {
  info?: User;
  className?: string;
  click?: () => void;
};

const CardAddUser = ({ info, className, click }: CardAddUserProps) => {
  const [data, setData] = useState<User>(info || ({} as User));
  const useCreate = useCreateUserMutation();
  const { t } = useTranslation();
  const { notify } = useNotify();

  // Chạy lần đầu
  useEffect(() => {
    if (info) setData(info);
  }, [info]);

  // Cập nhật data từng hàng
  const updateUserField = useCallback(<K extends keyof User>(field: K, value: User[K]) => {
    setData((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, []);

  // Thêm user
  const handleAdd = (info: User) => {
    if (!info.email) {
      notify('Thiếu mail', 'error');
      return;
    }
    click?.();
    useCreate.mutate(info);
    useCreate.isSuccess;
  };

  return (
    <div className={`${styles.body} ${className || ''}`}>
      <STText variant="title" className={styles.title}>
        {t('userPage.addUser')}
      </STText>
      <div className={styles.content}>
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
        <InfoLine
          label={t('profile.userName')}
          value={data?.username || ''}
          onChange={(str) => updateUserField('username', str)}
        />
        <InfoLine
          label={t('profile.passWord')}
          value={data?.password || ''}
          onChange={(str) => updateUserField('password', str)}
        />
        <InfoLine
          label={t('profile.fullName')}
          value={data?.fullName || ''}
          onChange={(str) => updateUserField('fullName', str)}
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
        {/* <InfoComboBoxLine
          option={languageOption}
          label={t('profile.nation')}
          value={data?.nationId?.toString() || ''}
          onChange={(str) => updateUserField('nationId', number.parse(String(str ?? '')))}
        /> */}

        <InfoComboBoxLine
          option={genderOption}
          label={t('profile.gender')}
          value={data?.gender || ''}
          onChange={(str) => updateUserField('gender', str as gender | null)}
        />
        <InfoComboBoxLine
          option={genderOption}
          label={t('profile.nation')}
          value={data?.gender || ''}
          onChange={(str) => updateUserField('gender', str as gender | null)}
        />
        <InfoComboBoxLine
          option={genderOption}
          label={t('profile.role')}
          value={data?.gender || ''}
          onChange={(str) => updateUserField('gender', str as gender | null)}
        />

        {/* <InfoLine
          label={t('profile.address')}
          value={data?.address || ''}
          onChange={(str) => updateUserField('address', str)}
        />

        <InfoComboBoxLine
          option={positionOption}
          label={t('profile.position')}
          value={data?.position || ''}
          onChange={(str) => updateUserField('position', String(str) ?? '')}
        /> */}
        {/* 
        <InfoComboBoxLine
          option={roleOption}
          label={t('profile.role')}
          value={data?.role || ''}
          onChange={(str) => updateUserField('role', String(str) ?? '')}
        /> */}

        {/* <InfoDateLine
          enable={false}
          label="Ngày tạo"
          value={data?.createdAt || null}
          onChange={(str) => {
            const newDate = str ? new Date(str) : undefined;
            updateUserField('createdAt', newDate as Date);
          }}
        />
        <InfoDateLine
          enable={false}
          label="Ngày cập nhật"
          value={data?.updatedAt || null}
          onChange={(str) => {
            const newDate = str ? new Date(str) : undefined;
            updateUserField('updatedAt', newDate as Date);
          }}
        /> */}
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
        <STButton label={t('button.add')} onClick={() => handleAdd(data)} />
      </div>
    </div>
  );
};

export default CardAddUser;
