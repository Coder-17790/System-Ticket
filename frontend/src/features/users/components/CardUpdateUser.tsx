import AvartarInput from '@/components/forms/AvartarInput';
import { InfoComboBoxLine, InfoDateLine, InfoLine } from '@/components/forms/InputLine';
import STButton from '@/components/ui/STButton';
import STText from '@/components/ui/STText';
import { gender, genderOption, User } from '@/types';
import utilt from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useGetListRoles } from '../hooks/useRole';
import { useUpdateAvatar, useUpdateUserMutation } from '../hooks/useUsers';
import styles from './CardUpdateUser.module.scss';
import { useGetListNation } from '../hooks/useNation';

type CardInfoProps = {
  info?: User;
  className?: string;
};

const CardInfo = ({ info, className }: CardInfoProps) => {
  const [data, setData] = useState<User>(info || ({} as User));
  const useUpdate = useUpdateUserMutation();
  const useUpdateAvt = useUpdateAvatar();
  const { t } = useTranslation();
  const {
    data: listRoles,
    isLoading: listRoles_Loading,
    isError: listRoles_Error,
  } = useGetListRoles();
  const {
    data: listNation,
    isLoading: listNation_Loading,
    isError: listNation_Error,
  } = useGetListNation();
  console.log('listNation--', listNation);
  console.log('listRoles--', listRoles);

  // Chạy lần đầu
  useEffect(() => {
    if (info) setData(info);
  }, [info]);

  // Cập nhật data từng hàng
  const updateUserField = useCallback(
    <K extends keyof User>(field: K, value: Partial<User[K]> | User[K]) => {
      setData((prev) => {
        if (!prev) return prev;

        const prevField = prev[field];

        const isObject = prevField !== null && typeof prevField === 'object';

        const nextField = isObject
          ? { ...(prevField as any), ...(value as any) } // 👉 merge object
          : (value as any); // 👉 primitive → gán thẳng

        return {
          ...prev,
          [field]: nextField,
        };
      });
    },
    []
  );

  // Cập nhật user
  const handleUpdate = (info: User) => {
    useUpdate.mutate(info);
    useUpdate.isSuccess;
  };

  // Cập avatar
  const handleUpdateAvatar = (id: string, file: File) => {
    useUpdateAvt.mutate({ id, file });
    useUpdate.isSuccess;
  };

  return (
    <div className={`${styles.body} ${className || ''}`}>
      <STText variant="title" className={styles.title}>
        {t('userPage.updateUser')}
      </STText>
      <div className={styles.divAvatar}>
        <AvartarInput
          source={data?.avatar || ''}
          onAddAvatar={(file) => handleUpdateAvatar(data.id.toString(), file)}
        />
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
        <InfoComboBoxLine
          option={genderOption}
          label={t('profile.gender')}
          value={data?.gender || ''}
          onChange={(str) => updateUserField('gender', str as gender)}
        />
        <InfoComboBoxLine
          option={utilt.format.mapToOptionsCbb(listRoles?.data ?? undefined, 'id', 'name')}
          label={t('profile.role')}
          value={data?.role.id || ''}
          onChange={(str) => updateUserField('role', { id: str?.toString() })}
        />
        <InfoComboBoxLine
          option={utilt.format.mapToOptionsCbb(listNation?.data ?? undefined, 'id', 'name')}
          label={t('profile.nation')}
          value={data?.nation.id || ''}
          onChange={(str) => updateUserField('nation', { id: str?.toString() })}
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
