import { User } from '@/types';
import CardUser from '../components/CardUser';
import { useUsersQuery as useUsers } from '../hooks/useUsers';
import style from './userList.module.scss';
import STSwitchButton from '@/components/ui/STSwitchButton';
import { toggleTheme } from '@/store/slices/themeSlice';
import { useDispatch } from 'react-redux';

export default function UserList() {
  const { data: users, isLoading, isError, error } = useUsers();
  const dispatch = useDispatch();

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Lỗi: {(error as Error).message}</p>;

  // Nhấn nút đổi chủ đề
  const handleToggleTheme = (newStatus: boolean) => {
    dispatch(toggleTheme(newStatus ? 'dark' : 'light'));
  };

  // render card user
  const cardUser = (item: User) => {
    return <CardUser info={item} />;
  };

  return (
    <div className={style.body}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Danh sách người dùng</h2>
        <STSwitchButton onchange={handleToggleTheme} />
      </div>
      <div style={{ display: 'flex' }}>
        <div className={style.cardInfo}></div>
        <div className={style.userList}>{users?.map((item) => cardUser(item))}</div>
      </div>
    </div>
  );
}
