// Giả lập: lấy user từ API / React Query / localStorage
export async function authLoader() {
  const token = localStorage.getItem('token');
  // return { error: 'Test lỗi' };
  // throw new Error('Lỗi rồi');

  if (!token) {
    // Chưa đăng nhập → redirect về login
    throw new Response('Unauthorized', {
      status: 302,
      headers: { Location: '/login' },
    });
  }

  // Ở đây bạn có thể fetch user info luôn:
  return { user: 'TKCH' };
}
