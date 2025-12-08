import { useQuery } from '@tanstack/react-query';
import { getRole } from '../api/role';
import { ResponseAPI } from '@/types';
import { Role } from '@/types/role';

// Query key thống nhất để tránh lỗi đánh sai key string
const KEY = ['role'];

/** Hook: Lấy danh sách người dùng */
export const useGetListRoles = () =>
  useQuery<ResponseAPI<Role[]>>({
    queryKey: KEY,
    queryFn: getRole,
    // staleTime: 5 * 60 * 1000, // 5 phút
  });
