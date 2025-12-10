import AvartarInput from '@/components/forms/AvartarInput';
import { InfoComboBoxLine, InfoDateLine, InfoLine } from '@/components/forms/InputLine';
import STButton from '@/components/ui/STButton';
import STText from '@/components/ui/STText';
import { gender, genderOption, User } from '@/types';
import utilt from '@/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useGetListNation } from '../hooks/useNation';
import { useGetListRoles } from '../hooks/useRole';
import { useUpdateAvatar, useUpdateUserMutation } from '../hooks/useUsers';
import styles from './CardUpdateUser.module.scss';
import { useNotify } from '@/providers/NotificationProvider';
import { number } from 'framer-motion';

type CardInfoProps = {
  info?: User;
  className?: string;
  click?: () => void;
};

const CardUpdateUser = ({ info, className, click }: CardInfoProps) => {
  const [data, setData] = useState<User>(info || ({} as User));
  const useUpdate = useUpdateUserMutation();
  const useUpdateAvt = useUpdateAvatar();
  const { t } = useTranslation();
  const { data: listRoles } = useGetListRoles();
  const { data: listNation } = useGetListNation();
  const avatar = useRef<File | null>(null);
  const { notify } = useNotify();
  const [dataUpdate, setDataupdate] = useState<Partial<User>>({});

  // Chạy lần đầu
  useEffect(() => {
    if (info) setData(info);
  }, [info]);

  // Cập nhật data từng hàng
  const updateUserField = useCallback(
    <K extends keyof User>(field: K, value: User[K]) => {
      // 1. Cập nhật data để hiển thị trên UI
      setData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          [field]: value,
        };
      });

      // 2. Cập nhật dataUpdate (chỉ lưu field khác so với info ban đầu)
      setDataupdate((prevUpdate) => {
        // nếu chưa có info gốc thì không thể so sánh, cứ trả lại prevUpdate
        if (!info) return prevUpdate || {};

        const isEqual = JSON.stringify(info[field]) === JSON.stringify(value);

        // 2.1. Nếu value mới giống với info ban đầu → remove khỏi dataUpdate
        if (isEqual) {
          if (!prevUpdate) return {};
          const { [field]: _removed, ...rest } = prevUpdate;
          return rest;
        }

        // 2.2. Ngược lại → set/update field trong dataUpdate
        return {
          ...(prevUpdate || {}),
          [field]: value,
        };
      });
    },
    [info] // nhớ đóng ngoặc useCallback
  );

  // Cập nhật user
  const handleUpdate = (info: Partial<User>) => {
    try {
      useUpdate.mutate(
        { id: data.id, info: info },
        {
          onSuccess: () => {
            if (avatar.current) {
              // Giả sử API cần 2 field: id và file (tùy lại type của bạn mà chỉnh cho đúng)
              useUpdateAvt.mutate({
                id: data.id,
                file: avatar.current,
              });
              // Sau khi gửi xong có thể reset để tránh upload lại ảnh cũ lần sau
              avatar.current = null;
            }
            useUpdate.isSuccess;
            click?.();
            avatar.current = null;
          },
          onError: (error) => {
            notify(`Cập nhật thất bại ${error}`, 'error');
          },
        }
      );
    } catch {}
  };

  // Lưu ảnh
  const storeAvatar = (file: File) => {
    avatar.current = file;
  };

  return (
    <div className={`${styles.body} ${className || ''}`}>
      <STText variant="title" className={styles.title}>
        {t('userPage.updateUser')}
      </STText>
      <div className={styles.divAvatar}>
        <AvartarInput source={data?.avatar || ''} onAddAvatar={(file) => storeAvatar(file)} />
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
          onChange={(str) => updateUserField('phone', str)}
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
          value={data?.roleId || ''}
          onChange={(str) => updateUserField('roleId', str as number)}
        />
        <InfoComboBoxLine
          option={utilt.format.mapToOptionsCbb(listNation?.data ?? undefined, 'id', 'name')}
          label={t('profile.nation')}
          value={data?.nationId || ''}
          onChange={(str) => updateUserField('nationId', str as number)}
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
        <STButton label={t('button.save')} onClick={() => handleUpdate(dataUpdate)} />
      </div>
    </div>
  );
};

export default CardUpdateUser;
