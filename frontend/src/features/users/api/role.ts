import { fetchAPI } from '@/api/fetchAPI';
import { ResponseAPI } from '@/types';
import { Role } from '@/types/role';

// Lấy ds role
export async function getRole() {
  const res = await fetchAPI<ResponseAPI<Role[]>>(`/api/roles`, {
    method: 'GET',
  });
  if (!res) throw new Error('Lấy danh sách role (Quyền) thất bại');
  return res;
}
