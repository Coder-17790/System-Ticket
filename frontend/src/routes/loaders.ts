import { refetchToken } from '@/api/apiClient';
import { ResponseAPI } from '@/types';
import utilt from '@/utils';
import { redirect } from 'react-router-dom';

export async function authLoader({ request }: { request: Request }) {
  const token = utilt.storage.get('accessToken');

  // Chưa đăng nhập
  if (!token) {
    throw redirect('/login');
  }

  try {
    const res: ResponseAPI = await refetchToken(token);

    // Token không hợp lệ
    if (!res.success) {
      utilt.storage.remove('accessToken');

      const url = new URL(request.url);
      throw redirect(`/login?from=${encodeURIComponent(url.pathname + url.search)}`);
    }

    // Token hợp lệ → trả data cho page dùng
    return { me: res };
  } catch (error) {
    utilt.storage.remove('accessToken');
    throw redirect('/login');
  }
}

export async function guestOnlyLoader() {
  const token = utilt.storage.get('accessToken');

  // Chưa đăng nhập → cho vào login
  if (!token) {
    return null;
  }

  try {
    const res: ResponseAPI = await refetchToken(token);

    // Đã đăng nhập → đá về trang chủ
    if (res.success) {
      throw redirect('/');
    }

    return null;
  } catch (error) {
    // Token lỗi / hết hạn
    return error;
  }
}
