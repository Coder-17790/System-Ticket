import { redirect } from 'react-router-dom';
import { refetchToken } from '@/api/util';
import utilt from '@/utils';

// Giả sử bạn có một biến global hoặc store để cache kết quả auth
let isFetched = false;

// Vô Home
export async function authLoader() {
  const token = utilt.storage.get('accessToken');

  if (!token) {
    throw redirect(`/login`);
  }

  // Nếu đã fetch rồi thì thôi, hoặc check hết hạn token ở đây
  if (isFetched) return;

  try {
    const res = await refetchToken();
    if (!res.success) throw new Error();

    isFetched = true; // Đánh dấu đã xác thực thành công
    return { me: res.data };
  } catch {
    utilt.storage.remove('accessToken');
    throw redirect('/login');
  }
}

// Vô login
export async function guestOnlyLoader() {
  const token = utilt.storage.get('accessToken');

  // Không có token thì chắc chắn là guest
  if (!token) return null;

  try {
    // Nếu có token, check nhẹ xem nó còn dùng được không
    const res = await refetchToken();
    if (res.success) {
      throw redirect('/');
    }
    return null;
  } catch {
    return null;
  }
}
