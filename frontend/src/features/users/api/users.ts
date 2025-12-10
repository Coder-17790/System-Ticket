import { FilterUser, ResponseAPI, User, UserCreate, UserGetList } from '@/types';
import { fetchAPI } from '@/api/fetchAPI';

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
export async function updateUser(data: { id: string; info: Partial<User> }) {
  const res = await fetch(`/api/users/${data.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data.info),
  });
  if (!res.ok) throw new Error('Failed to update user');

  // Nếu response không có body (204), trả về object rỗng
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

// Cập nhật avatar
export async function updateAvatar(data: { id: string; file: File }) {
  const formData = new FormData();
  formData.append('avatar', data.file);

  return fetchAPI(`/api/users/${data.id}/avatar`, {
    method: 'PUT',
    body: formData,
    headers: {},
  });
}

//  Tìm người dùng theo tên hoặc email
export async function findUser(filter: FilterUser) {
  const res = await fetchAPI<ResponseAPI<UserGetList>>('/api/users/find', {
    method: 'POST',
    body: JSON.stringify(filter),
  });
  if (!res) throw new Error('Failed to fetch users');
  return res;
}

// Thêm mới người dùng
export async function createUsers(user: UserCreate) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

//Cập nhật người dùng
export async function addUser(info: User) {
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
