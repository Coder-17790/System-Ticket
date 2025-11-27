// Custom API fetch
export async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  const json = await res.json();
  return json as T;
}
