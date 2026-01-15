import { fetchAPI } from './fetchAPI';
import { store } from '@/store';

const token = store.getState().user.token; // Sử dụng store.getState() để lấy token

// refetch Token
export const refetchToken = async () => {
  try {
    const res = await fetchAPI('/api/auth/refetchToken', {
      method: 'GET',
      authToken: token,
    });

    console.log('refetchToken');

    if (!res) {
      throw new Error('Refresh token expired');
    }

    return await res;
  } catch (err) {
    throw err;
  }
};
