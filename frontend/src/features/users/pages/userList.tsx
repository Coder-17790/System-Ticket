import { User } from '@/types';
import CardUser from '../components/cardUser';
import { useUsersQuery as useUsers } from '../hooks/useUsers';
import './userList.scss';

export default function UserList() {
  const { data: users, isLoading, isError, error } = useUsers();

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Lỗi: {(error as Error).message}</p>;

  // rebder card user
  const cardUser = (item: User) => {
    return <CardUser info={item} />;
  };

  return <div className="st-body">{users?.map((item) => cardUser(item))}</div>;
}
