import STInput from '@/components/ui/STInput';
import styles from './CardInfo.module.scss';
import { User } from '@/types';
import STText from '@/components/ui/STText';
import { fomatData_1 } from '@/utils';
import STButton from '@/components/ui/Button';
import React, { useEffect, useState } from 'react';

type CardInfoProps = {
  info?: User;
  className?: string;
};

const CardInfo= React.memo(({ info, className }: CardInfoProps) => {
  const [data, setData] = useState<User>(info || ({} as User));

  // Chạy lần đầu
  useEffect(() => {
    if (info) setData(info);
  }, [info]);

  // Cập nhật data từng hàng
  const updateUserField = <K extends keyof User>(field: K, value: User[K]) => {
    // console.log('value:', value);
    setData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  // Component hiển thị thông tin người dùng theo dòng
  const InfoLine = ({
    label,
    value,
    enable = true,
    textarea = false,
    style,
    onChange,
  }: {
    label: string;
    value?: string | number | boolean;
    enable?: boolean;
    textarea?: boolean;
    style?: React.CSSProperties;
    onChange?: (str: string) => void;
  }) => {
    return (
      <div>
        <STText className={styles.label}>{label}:</STText>
        <STInput
          placeholder="..."
          value={String(value)}
          enable={enable}
          textarea={textarea}
          style={style}
          onChange={onChange}
        />
      </div>
    );
  };

  return (
    <div className={`${styles.body} ${className || ''}`}>
      <div className={styles.content}>
        {/* <div>
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
        </div> */}

        <div>
          <InfoLine
            label="SĐT"
            value={data?.phone ?? ''}
            // onChange={(str) => updateUserField('phone', str)}
            onChange={(str) => setData((prev) => (prev ? { ...prev, phone: str } : prev))}
          />
          {/* <InfoLine
            label="Ngày sinh"
            value={data?.createdAt ? fomatData_1(data.createdAt, 'yyyy-mm-dd') : ''}
            onChange={(str) => {
              const newDate = str ? new Date(str) : undefined;
              updateUserField('dateOfBirth', newDate as Date);
            }}
          /> */}
        </div>

        {/* <div>
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
        </div> */}

        {/* <div>
          <InfoLine
            label="Chức vụ"
            value={data?.position || ''}
            onChange={(str) => updateUserField('position', str)}
          />
          <InfoLine
            label="Vai trò"
            value={data?.role || ''}
            onChange={(str) => updateUserField('role', str)}
          />
        </div> */}
        <div>
          {/* <InfoLine
            label="Ngày tạo"
            value={data?.createdAt ? fomatData_1(data.createdAt, 'yyyy-mm-dd') : ''}
            enable={false}
          />
          <InfoLine
            label="Ngày cập nhật"
            value={data?.updatedAt ? fomatData_1(data.updatedAt, 'yyyy-mm-dd') : ''}
            enable={false}
          /> */}
        </div>
      </div>

      <InfoLine
        label="Giới thiệu bản thân"
        value={data?.bio || ''}
        textarea
        onChange={(str) => updateUserField('bio', str)}
      />

      <div className={styles.buttonWrapper}>
        <STButton label="Cập nhật" />
      </div>
    </div>
  );
});

export default CardInfo;
