import { InfoComboBoxLine, InfoDateLine, InfoLine } from '@/components/forms/InputLine';
import STButton from '@/components/ui/STButton';
import STText from '@/components/ui/STText';
import { languageOption, positionOption, roleOption, User } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useUpdateUserMutation } from '../hooks/useUsers';
import styles from './CardUpdateUser.module.scss';

type CardInfoProps = {
  info?: User;
  className?: string;
};

const CardInfo = ({ info, className }: CardInfoProps) => {
  const [data, setData] = useState<User>(info || ({} as User));
  const useUpdate = useUpdateUserMutation();

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
        Cập nhật User mới
      </STText>
      <div className={styles.content}>
        <InfoLine
          label="Họ và tên"
          value={data?.fullName || ''}
          onChange={(str) => updateUserField('fullName', str)}
        />
        <InfoLine
          label="Email"
          value={data?.email || ''}
          onChange={(str) => updateUserField('email', str)}
        />

        <InfoLine
          label="Biệt danh"
          value={data?.title || ''}
          onChange={(str) => updateUserField('title', str)}
        />
        <InfoComboBoxLine
          option={languageOption}
          label="Ngôn ngữ"
          value={data?.language || ''}
          onChange={(str) => updateUserField('language', String(str) ?? '')}
        />

        <InfoLine
          label="SĐT"
          value={data?.phone ?? ''}
          onChange={(str) => setData((prev) => ({ ...prev, phone: str }))}
        />
        <InfoDateLine
          label="Ngày sinh"
          value={data?.dateOfBirth || null}
          onChange={(str) => {
            const newDate = str ? new Date(str) : undefined;
            updateUserField('dateOfBirth', newDate as Date);
          }}
        />

        <InfoLine
          label="Giới tính"
          value={data?.gender || ''}
          onChange={(str) => updateUserField('gender', str)}
        />
        <InfoLine
          label="Địa chỉ"
          value={data?.address || ''}
          onChange={(str) => updateUserField('address', str)}
        />

        <InfoComboBoxLine
          option={positionOption}
          label="Vị trí"
          value={data?.position || ''}
          onChange={(str) => updateUserField('position', String(str) ?? '')}
        />
        <InfoComboBoxLine
          option={roleOption}
          label="Vai trò"
          value={data?.role || ''}
          onChange={(str) => updateUserField('role', String(str) ?? '')}
        />

        <InfoDateLine
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
        />
      </div>

      <InfoLine
        style={{ marginTop: 30 }}
        label="Giới thiệu bản thân"
        value={data?.bio || ''}
        styleInput={{ height: 100 }}
        type="textarea"
        onChange={(str) => updateUserField('bio', str)}
      />

      <div className={styles.buttonWrapper}>
        <STButton label="Lưu" onClick={() => handleUpdate(data)} />
      </div>
    </div>
  );
};

export default CardInfo;
