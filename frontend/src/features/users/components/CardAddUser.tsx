import { InfoComboBoxLine, InfoDateLine, InfoLine } from '@/components/forms/InputLine';
import STButton from '@/components/ui/STButton';
import STText from '@/components/ui/STText';
import { useNotify } from '@/providers/NotificationProvider';
import { gender, genderOption, UserCreate } from '@/types';
import utilt from '@/utils';
import { useCallback, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useGetListNation } from '../hooks/useNation';
import { useGetListRoles } from '../hooks/useRole';
import { useCreateUserMutation, useUpdateAvatar } from '../hooks/useUsers';
import styles from './CardAddUser.module.scss';
import AvartarInput from '@/components/forms/AvartarInput';
// import { number } from 'framer-motion';

type CardAddUserProps = {
  className?: string;
  click?: () => void;
};

const CardAddUser = ({ className, click }: CardAddUserProps) => {
  const [data, setData] = useState<UserCreate>({
    email: '',
    username: '',
    password: '',
    fullName: '',
  });
  const useCreate = useCreateUserMutation();
  const useUppdataAvatar = useUpdateAvatar();

  const { t } = useTranslation();
  const { notify } = useNotify();
  const avatar = useRef<File | null>(null);

  const { data: listNation } = useGetListNation();
  const { data: listRole } = useGetListRoles();

  // Cập nhật data từng hàng
  const updateUserField = useCallback(
    <K extends keyof UserCreate>(field: K, value: UserCreate[K]) => {
      setData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          [field]: value,
        };
      });
    },
    []
  );

  // Lưu ảnh
  const storeAvatar = (file: File) => {
    avatar.current = file;
  };

  // Thêm user
  const handleAdd = (info: UserCreate) => {
    if (!info.email) {
      notify('Thiếu mail', 'error');
      return;
    }
    click?.();
    useCreate.mutate(data, {
      onSuccess: (createdUser) => {
        // Là backend trả về
        if (avatar.current) {
          useUppdataAvatar.mutate({
            id: createdUser.data.id,
            file: avatar.current,
          });
        }
      },
    });
    useCreate.isSuccess;
  };

  return (
    <div className={`${styles.body} ${className || ''}`}>
      <STText variant="title" className={styles.title}>
        {t('userPage.addUser')}
      </STText>
      <div className={styles.divAvatar}>
        <AvartarInput source={data?.avatar || ''} onAddAvatar={(file) => storeAvatar(file)} />
      </div>
      <div className={styles.content}>
        <InfoLine
          label={t('profile.email')}
          value={data?.email || ''}
          required
          onChange={(str) => updateUserField('email', str)}
        />
        <InfoLine
          required
          label={t('profile.fullName')}
          value={data?.fullName || ''}
          onChange={(str) => updateUserField('fullName', str)}
        />
        <InfoLine
          required
          label={t('profile.userName')}
          value={data?.username || ''}
          onChange={(str) => updateUserField('username', str)}
        />
        <InfoLine
          required
          label={t('profile.passWord')}
          value={data?.password || ''}
          onChange={(str) => updateUserField('password', str)}
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
            updateUserField('dateOfBirth', new Date(String(newDate)));
          }}
        />
        <InfoComboBoxLine
          option={genderOption}
          label={t('profile.gender')}
          value={data?.gender || ''}
          onChange={(str) => updateUserField('gender', String(str) as gender)}
        />
        <InfoComboBoxLine
          option={utilt.format.mapToOptionsCbb(listRole?.data ?? undefined, 'id', 'name')}
          label={t('profile.role')}
          value={(data?.roleId && data?.roleId) ?? ''}
          onChange={(str) => updateUserField('roleId', Number(str))}
        />
        <InfoComboBoxLine
          option={utilt.format.mapToOptionsCbb(listNation?.data ?? undefined, 'id', 'name')}
          label={t('profile.nation')}
          value={(data?.nationId && data?.nationId) ?? ''}
          onChange={(str) => updateUserField('nationId', Number(str))}
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
        <STButton label={t('button.add')} onClick={() => handleAdd(data)} />
      </div>
    </div>
  );
};

export default CardAddUser;
