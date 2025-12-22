import { _ReturnNull } from 'i18next';

// Thêm AuthToken vào RequestInit/Options tùy chỉnh
interface CustomRequestOptions extends RequestInit {
  authToken?: string | null; // Token tùy chọn
}

export const fetchAPI = async <T = any>(url: string, options: CustomRequestOptions = {}) => {
  const { authToken: customAuthToken, ...fetchOptions } = options;
  let headers: HeadersInit = {};

  // 1. Thêm Auth Token
  // Nếu có authToken tùy chỉnh, sử dụng nó. Ngược lại, thử lấy từ Redux.
  const token = customAuthToken;

  if (token) {
    // Định dạng Authorization header theo chuẩn Bearer Token
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 2. Set JSON Header (nếu không phải FormData)
  // Nếu body KHÔNG PHẢI FormData → set JSON header
  if (!(fetchOptions.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // 3. Merge header từ options, ưu tiên options (đặc biệt là Authorization/Content-Type)
  // LƯU Ý: Sẽ ưu tiên header được truyền trực tiếp trong options.headers
  headers = { ...headers, ...(fetchOptions.headers || {}) };

  const res = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json(); // Đọc body JSON
    throw errorBody;
  }
  return res.json() as T;
};
