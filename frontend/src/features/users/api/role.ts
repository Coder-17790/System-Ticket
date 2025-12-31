import { fetchAPI } from '@/api/fetchAPI';
import { store } from '@/store';
import { ResponseAPI } from '@/types';
import { Role } from '@/types/role';

// Hàm helper lấy token
const getToken = () => store.getState().user.token;

// Lấy ds role
export async function getRole() {
  const token = getToken();
  const res = await fetchAPI<ResponseAPI<Role[]>>(`/api/roles`, {
    method: 'GET',
    authToken: token,
  });
  if (!res) throw new Error('Lấy danh sách role (Quyền) thất bại');
  return res;
}
