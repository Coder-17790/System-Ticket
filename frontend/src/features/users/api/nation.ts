import { fetchAPI } from '@/api/fetchAPI';
import { store } from '@/store';
import { ResponseAPI } from '@/types';
import { Nation } from '@/types/nation';

// Hàm helper lấy token
const getToken = () => store.getState().user.token;

// Lấy danh sách nation
export async function getListNation() {
  const token = getToken();
  const res = fetchAPI<ResponseAPI<Nation[]>>('api/nation', {
    method: 'GET',
    authToken: token,
  });
  if (!res) throw new Error('Lấy danh sách nation (Quốc gia) thất bại');
  return res;
}
