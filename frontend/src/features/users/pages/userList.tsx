import { User } from '@/types';
import CardUser from '../components/CardUser';
import { useUsersQuery as useUsers } from '../hooks/useUsers';
import style from './userList.module.scss';
import STSwitchButton from '@/components/ui/STSwitchButton';
import { toggleTheme } from '@/store/slices/themeSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import CardInfo from '../components/CardInfo';
import STText from '@/components/ui/STText';

export default function UserList() {
  const { data: users, isLoading, isError, error } = useUsers();
  const dispatch = useDispatch();
  const [info, setInfo] = useState<User>();
  const [focusedUserId, setFocusedUserId] = useState<string | null>(null);

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Lỗi: {(error as Error).message}</p>;

  // Nhấn nút đổi chủ đề
  const handleToggleTheme = (newStatus: boolean) => {
    dispatch(toggleTheme(newStatus ? 'dark' : 'light'));
  };

  // callback info user
  const handleInfoUser = (user: User) => {
    setFocusedUserId(String(user.id));
    setInfo(user);
  };

  // render card user
  const cardUser = (item: User, getInfo: () => void, focus: boolean) => {
    return <CardUser info={item} getInfoUser={getInfo} select={focus} />;
  };

  return (
    <div className={style.body}>
      <div className={style.bodyHeader}>
        <STText variant="title">Danh sách người dùng</STText>
        <STSwitchButton onchange={handleToggleTheme} />
      </div>
      <div style={{ display: 'flex' }}>
        <CardInfo className={style.cardInfo} info={info}></CardInfo>
        <div className={style.userList}>
          {users?.map((item) =>
            cardUser(item, () => handleInfoUser(item), focusedUserId === String(item.id))
          )}
        </div>
      </div>
    </div>
  );
}
