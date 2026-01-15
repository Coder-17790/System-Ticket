import { fetchAPI } from '@/api/fetchAPI';
import { ResponseAPI, UserLogin } from '@/types';

// Định nghĩa đúng kiểu request có user (đã được middleware trước đó gắn vào)
export type AuthenticatedRequest = Request & {
  user: UserLogin;
  auth?: string;
  isVerifiedAccount: boolean;
};

export async function authenticateToken() {
  const res = fetchAPI<ResponseAPI>('api/auth', {
    method: 'GET',
  });
  if (!res) throw new Error('Đăng nhập thành công');
  return res;
}

// Đăng nhập
export async function loginAPI(username: string, password: string) {
  const res = fetchAPI<ResponseAPI<AuthenticatedRequest>>('api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!res) throw new Error('Đăng ký thất bại');

  return res;
}

// Đăng ký
export async function register(username: string, password: string) {
  const res = fetchAPI<ResponseAPI<AuthenticatedRequest>>('api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!res) throw new Error('Đăng nhập thất bại');

  return res;
}
