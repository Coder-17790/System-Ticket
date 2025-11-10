import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, deleteUser } from '../api/getUsers';
import { User } from '@/types';

// Hook để lấy danh sách người dùng
export function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });
}

// Hook để xoá người dùng
export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      // Sau khi xoá thành công, làm mới danh sách người dùng
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
