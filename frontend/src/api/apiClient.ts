import { ResponseAPI } from '@/types';
import { fetchAPI } from './fetchAPI';

// refetch Token
const refetchToken = async (token: string) => {
  return await fetchAPI<ResponseAPI>(`/api/auth/refetchToken`, {
    authToken: token,
    method: 'GET',
    credentials: 'include', // gắn cookie
  });
};

export { refetchToken };
