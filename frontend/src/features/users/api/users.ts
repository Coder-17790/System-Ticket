import { FilterUser, ResponseAPI, User, UserCreate, UserGetList } from '@/types';
import { fetchAPI } from '@/api/fetchAPI';
import { store } from '@/store'; // Lấy store trực tiếp, đảm bảo không vòng import

// Hàm helper lấy token
const getToken = () => store.getState().user.token;

// Lấy danh sách người dùng
export async function getUsers() {
  const token = getToken() ?? null;
  return fetchAPI('/api/users', { authToken: token });
}

// Xoá người dùng
export async function deleteUser(userId: string) {
  const token = getToken();
  return fetchAPI(`/api/users/${userId}`, { method: 'DELETE', authToken: token });
}

// Cập nhật người dùng
export async function updateUser(data: { id: string; info: Partial<User> }) {
  const token = getToken();
  return fetchAPI(`/api/users/${data.id}`, {
    method: 'PATCH',
    body: JSON.stringify(data.info),
    authToken: token,
  });
}

// Cập nhật avatar
export async function updateAvatar(data: { id: string; file: File }) {
  const token = getToken();
  const formData = new FormData();
  formData.append('avatar', data.file);

  return fetchAPI(`/api/users/${data.id}/avatar`, {
    method: 'PUT',
    body: formData,
    authToken: token,
  });
}

// Tìm người dùng
export async function findUser(filter: FilterUser): Promise<ResponseAPI<UserGetList>> {
  const token = getToken();
  return fetchAPI(`/api/users/find`, {
    method: 'POST',
    body: JSON.stringify(filter),
    authToken: token,
  });
}

// Thêm mới người dùng
export async function createUsers(user: UserCreate) {
  const token = getToken();
  return fetchAPI('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    authToken: token,
  });
}

// Cập nhật người dùng
export async function addUser(info: User) {
  const token = getToken();
  return fetchAPI(`/api/users/${info.id}`, {
    method: 'PUT',
    body: JSON.stringify(info),
    authToken: token,
  });
}
