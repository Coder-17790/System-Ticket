export type ResponseAPI<T> = {
  success: boolean; // true = OK, false = error
  status: number; // HTTP status code (200, 400, 500, ...)
  message: string; // mô tả ngắn gọn
  data?: T | null; // dữ liệu chính (nếu có)
  error?: TypeError; // thông tin lỗi (nếu có)
};

export type TypeError = {
  code: string; // Mã lỗi nội bộ (ví dụ: 'EMAIL_EXISTS', 'INVALID_INPUT')
  raw?: any; // Lưu dữ liệu gốc của lỗi (error object gốc từ catch)
  hint?: string; // Gợi ý cách khắc phục (tùy chọn)
};