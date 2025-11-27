import { Request, Response, NextFunction } from 'express';
import { ResponseAPI, TypeError, HttpStatus, ErrorMap } from '../type';

// 🧱 Middleware xử lý lỗi
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('🔥 Error caught:', err);

  let status = HttpStatus.BAD_REQUEST;
  let code = 'UNKNOWN_ERROR';
  let message = 'Đã xảy ra lỗi không xác định';
  let hint = '';

  // Tìm lỗi trong ErrorMap
  const found = ErrorMap.find((rule) =>
    rule.match.some((m) => err.message?.includes(m) || err.name === m)
  );

  if (found) {
    status = found.status;
    code = found.code;
    message = found.message;
    hint = found.hint;
  }

  // Tạo phản hồi chuẩn
  const response: ResponseAPI<null> = {
    success: false,
    status,
    message,
    data: null,
    error: {
      code,
      raw: err.message,
      hint,
    },
  };

  res.status(status).json(response);
}
