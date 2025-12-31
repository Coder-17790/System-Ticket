import utilt from '@/utils';
import { fetchAPI } from './fetchAPI';

const token = utilt.storage.get('accessToken');

// refetch Token
export const refetchToken = async () => {
  try {
    const res = await fetchAPI('/api/auth/refetchToken', {
      method: 'GET',
      authToken: token,
    });

    if (!res) {
      throw new Error('Refresh token expired');
    }

    return await res;
  } catch (err) {
    throw err;
  }
};
