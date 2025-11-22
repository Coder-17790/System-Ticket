import STButton from '@/components/ui/STButton';
import STComboBox, { OptionCBB } from '@/components/ui/STComboBox';
import STDatePicker from '@/components/ui/STDatePicker';
import STInput from '@/components/ui/STInput';
import STText from '@/components/ui/STText';
import { languageOption, positionOption, roleOption, User } from '@/types';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useUpdateUserMutation } from '../hooks/useUsers';
import styles from './CardInfo.module.scss';

type CardInfoProps = {
  info?: User;
  className?: string;
};

// Component hiển thị thông tin người dùng theo dòng
const InfoLine = ({
  label,
  value,
  enable = true,
  type = 'text',
  styleInput,
  style,
  onChange,
}: {
  label: string;
  value?: string | number | boolean;
  enable?: boolean;
  type?: 'text' | 'textarea' | 'date';
  style?: React.CSSProperties;
  styleInput?: React.CSSProperties;
  onChange?: (str: string) => void;
}) => {
  return (
    <div style={style}>
      <STText block className={styles.label}>
        {label}:
      </STText>
      <STInput
        value={String(value)}
        enable={enable}
        textarea={type === 'textarea'}
        style={styleInput}
        onChange={onChange}
      />
    </div>
  );
};

// Component hiển thị thông tin ngày tháng
const InfoDateLine = ({
  label,
  value,
  enable = true,
  onChange,
  style,
}: {
  label: string;
  value?: Date | null;
  enable?: boolean;
  style?: React.CSSProperties;
  styleInput?: React.CSSProperties;
  onChange?: (date: Date | null) => void;
}) => {
  return (
    <div style={style}>
      <STText block className={styles.label}>
        {label}:
      </STText>
      <STDatePicker value={value} onChange={onChange} dateFormat="dd/MM/yyyy" enable={enable} />
    </div>
  );
};

// Component hiển thị thông tin ngày tháng
const InfoComboBoxLine = ({
  label,
  value,
  option,
  enable = true,
  onChange,
  style,
}: {
  label: string;
  option: OptionCBB[];
  value?: string | null;
  enable?: boolean;
  style?: React.CSSProperties;
  onChange?: (value: string | number | null) => void;
}) => {
  return (
    <div style={style}>
      <STText block className={styles.label}>
        {label}:
      </STText>
      <STComboBox options={option} disabled={!enable} onChange={onChange} value={value} />
    </div>
  );
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
      <div className={styles.content}>
        <div>
          <InfoLine
            label="Họ và tên"
            value={data?.fullName || ''}
            onChange={(str) => updateUserField('fullName', str)}
          />
          <InfoLine
            style={{ marginTop: 10 }}
            label="Email"
            value={data?.email || ''}
            onChange={(str) => updateUserField('email', str)}
          />
        </div>
        <div>
          <InfoLine
            label="Biệt danh"
            value={data?.title || ''}
            onChange={(str) => updateUserField('title', str)}
          />
          {/* <InfoLine
            style={{ marginTop: 10 }}
            label="Ngôn ngữ"
            value={data?.language || ''}
            onChange={(str) => updateUserField('language', str)}
          /> */}
          <InfoComboBoxLine
            option={languageOption}
            label="Ngôn ngữ"
            style={{ marginTop: 10 }}
            value={data?.language || ''}
            onChange={(str) => updateUserField('language', String(str) ?? '')}
          />
        </div>
        <div>
          <InfoLine
            label="SĐT"
            value={data?.phone ?? ''}
            onChange={(str) => setData((prev) => ({ ...prev, phone: str }))}
          />
          <InfoDateLine
            style={{ marginTop: 10 }}
            label="Ngày sinh"
            value={data?.dateOfBirth || null}
            onChange={(str) => {
              const newDate = str ? new Date(str) : undefined;
              updateUserField('dateOfBirth', newDate as Date);
            }}
          />
        </div>

        <div>
          <InfoLine
            label="Giới tính"
            value={data?.gender || ''}
            onChange={(str) => updateUserField('gender', str)}
          />
          <InfoLine
            style={{ marginTop: 10 }}
            label="Địa chỉ"
            value={data?.address || ''}
            onChange={(str) => updateUserField('address', str)}
          />
        </div>
        <div>
          <InfoComboBoxLine
            option={positionOption}
            label="Vị trí"
            value={data?.position || ''}
            onChange={(str) => updateUserField('position', String(str) ?? '')}
          />

          <InfoComboBoxLine
            option={roleOption}
            label="Vai trò"
            style={{ marginTop: 10 }}
            value={data?.role || ''}
            onChange={(str) => updateUserField('role', String(str) ?? '')}
          />
        </div>

        <div>
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
            style={{ marginTop: 10 }}
            enable={false}
            label="Ngày cập nhật"
            value={data?.updatedAt || null}
            onChange={(str) => {
              const newDate = str ? new Date(str) : undefined;
              updateUserField('updatedAt', newDate as Date);
            }}
          />
        </div>
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
        <STButton label="Cập nhật" onClick={() => handleUpdate(data)} />
      </div>
    </div>
  );
};

export default CardInfo;
