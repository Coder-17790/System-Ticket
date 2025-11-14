import { User } from '@/types';

// Lấy danh sách người dùng
export async function getUsers() {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

// Xoá người dùng theo id
export async function deleteUser(userId: string) {
  const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');

  // Nếu response không có body (204), trả về object rỗng
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

//Cập nhật người dùng
export async function updateUser(info: User) {
  const res = await fetch(`/api/users/${info.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info),
  });
  if (!res.ok) throw new Error('Failed to update user');

  // Nếu response không có body (204), trả về object rỗng
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}
