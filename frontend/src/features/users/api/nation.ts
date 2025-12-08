import { fetchAPI } from '@/api/fetchAPI';
import { ResponseAPI } from '@/types';
import { Nation } from '@/types/nation';

// Lấy danh sách nation
export async function getListNation() {
  const res = fetchAPI<ResponseAPI<Nation[]>>('api/nation/', {
    method: 'GET',
  });
  if (!res) throw new Error('Lấy danh sách nation (Quốc gia) thất bại');
  return res;
}
