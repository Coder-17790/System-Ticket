import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, deleteUser, updateUser, findUser, createUsers } from '../api/users';
import { FilterUser, ResponseAPI, User, UserGetList } from '@/types';

// Query key thống nhất để tránh lỗi đánh sai key string
const USERS_KEY = ['users'];

/** Hook: Lấy danh sách người dùng */
export const useUsersQuery = () =>
  useQuery<User[]>({
    queryKey: USERS_KEY,
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5 phút
  });

/** Hook: Tạo (thêm mới) người dùng */
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUsers,
    onSuccess: () => {
      // Sau khi tạo thành công, refetch danh sách người dùng
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
};

/** Hook: Xoá người dùng */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
};

/** Hook: Cập nhật người dùng */
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
};

/** Hook: Tìm người dùng theo tên hoặc email */
/** Hook: Tìm người dùng theo tên hoặc email */
export const useFindUserQuery = (filter: FilterUser) =>
  useQuery<ResponseAPI<UserGetList>, Error, UserGetList | null>({
    queryKey: [...USERS_KEY, filter], // tách cache theo filter
    queryFn: () => findUser(filter),
    enabled: !!filter, // chỉ chạy khi có filter
    select: (res) => res.data ?? null, // chỉ lấy phần data bên trong
    staleTime: 5 * 60 * 1000,
  });
