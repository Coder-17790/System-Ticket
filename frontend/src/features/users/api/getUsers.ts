// Lấy danh sách người dùng
export async function getUsers() {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

// Xoá người dùng theo ID
// export async function deleteUser(userId: string) {
//   const res = await fetch(`/api/users/${userId}`, {
//     method: 'DELETE',
//   });
//   if (!res.ok) throw new Error('Failed to delete user');
//   return res.json();
// }

export async function deleteUser(userId: string) {
  const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');

  // Nếu response không có body (204), trả về object rỗng
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}
