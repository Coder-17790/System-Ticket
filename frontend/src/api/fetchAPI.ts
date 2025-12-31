import { refetchToken } from './util';

interface CustomRequestOptions extends RequestInit {
  authToken?: string | null;
  _retry?: boolean;
}

let isRefreshing = false;
let refreshQueue: (() => void)[] = [];
const ulrRefecth = '/auth/refresh';

export const fetchAPI = async <T = any>(
  url: string,
  options: CustomRequestOptions = {}
): Promise<T> => {
  const { authToken, _retry, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    ...(fetchOptions.headers instanceof Headers
      ? Object.fromEntries(fetchOptions.headers)
      : Array.isArray(fetchOptions.headers)
        ? Object.fromEntries(fetchOptions.headers)
        : fetchOptions.headers || {}),
  };

  // const headers: Record<string, string> = {
  //   ...(fetchOptions.headers || {}),
  // };

  // ✅ Chỉ set Content-Type khi KHÔNG phải FormData
  if (fetchOptions.body && !(fetchOptions.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const res = await fetch(url, {
    ...fetchOptions,
    headers,
    credentials: 'include', // ⭐ bắt buộc cho refresh token
  });

  // 🔥 ACCESS TOKEN HẾT HẠN
  if (
    res.status === 401 &&
    !_retry &&
    !url.includes(ulrRefecth) // 🚫 tránh loop vô hạn
  ) {
    // ⏳ Đang refresh → cho request vào hàng đợi
    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push(() => resolve(fetchAPI<T>(url, { ...options, _retry: true })));
      });
    }

    isRefreshing = true;

    try {
      await refetchToken(); // refresh token

      // ✅ Gọi lại tất cả request đang chờ
      refreshQueue.forEach((cb) => cb());
      refreshQueue = [];

      return fetchAPI<T>(url, { ...options, _retry: true });
    } catch (error) {
      refreshQueue = [];
      throw error; // logout xử lý ở đây
    } finally {
      isRefreshing = false;
    }
  }

  // ❌ LỖI KHÁC
  if (!res.ok) {
    let error;
    try {
      const text = await res.text();
      error = text ? JSON.parse(text) : { message: 'Unknown error' };
    } catch {
      error = { message: 'Unknown error' };
    }
    throw error;
  }

  return res.json() as Promise<T>;
};
