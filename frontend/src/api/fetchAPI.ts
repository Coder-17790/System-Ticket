export async function fetchAPI<T>(url: string, options: RequestInit = {}) {
  let headers: HeadersInit = {};

  // Nếu body KHÔNG PHẢI FormData → set JSON header
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Merge header từ options, ưu tiên options
  headers = { ...headers, ...(options.headers || {}) };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as T;
}
