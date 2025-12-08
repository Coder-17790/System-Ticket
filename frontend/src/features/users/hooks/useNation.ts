import { ResponseAPI } from '@/types';
import { Nation } from '@/types/nation';
import { useQuery } from '@tanstack/react-query';
import { getListNation } from '../api/nation';

const KEY = ['nation'];

// Lấy danh sách quốc gia
export const useGetListNation = () =>
  useQuery<ResponseAPI<Nation[]>>({
    queryKey: KEY,
    queryFn: getListNation,
  });
