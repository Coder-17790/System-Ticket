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

export const HttpStatus = {
  // ✅ 2xx – Thành công
  OK: 200, // Thành công chung
  CREATED: 201, // Tạo mới thành công
  NO_CONTENT: 204, // Thành công nhưng không trả dữ liệu

  // ⚠️ 4xx – Lỗi phía client
  BAD_REQUEST: 400, // Request sai dữ liệu
  UNAUTHORIZED: 401, // Chưa đăng nhập / token sai
  FORBIDDEN: 403, // Không có quyền
  NOT_FOUND: 404, // Không tìm thấy
  CONFLICT: 409, // Trùng dữ liệu
  UNPROCESSABLE_ENTITY: 422, // Dữ liệu hợp lệ cú pháp nhưng sai logic
  TOO_MANY_REQUESTS: 429, // Gửi quá nhiều request

  // 💣 5xx – Lỗi server
  INTERNAL_SERVER_ERROR: 500, // Lỗi hệ thống
  BAD_GATEWAY: 502, // Gateway lỗi
  SERVICE_UNAVAILABLE: 503, // Server bảo trì / quá tải
  GATEWAY_TIMEOUT: 504, // Timeout khi gọi service khác
};

// Type này giúp gợi ý và kiểm tra kiểu an toàn: (VD:"let status: HttpStatus = 200")
export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

export const ErrorMap = [
  // 🧾 Nhóm 1 — Lỗi dữ liệu đầu vào (input sai / undefined)
  {
    match: ['invalid', 'undefined'],
    code: 'INVALID_INPUT',
    status: HttpStatus.BAD_REQUEST, // 400
    message: 'Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại!',
    hint: 'Kiểm tra xem đã nhập đủ trường bắt buộc chưa',
  },

  // 🧍‍♂️ Nhóm 2 — Lỗi trùng dữ liệu duy nhất (email, username,...)
  {
    match: ['Email already exists'],
    code: 'EMAIL_EXISTS',
    status: HttpStatus.CONFLICT, // 409
    message: 'Email này đã được sử dụng!',
    hint: 'Dùng địa chỉ email khác để đăng ký.',
  },

  // 🔒 Nhóm 3 — Lỗi quyền hạn (permission)
  {
    match: ['permission denied'],
    code: 'PERMISSION_DENIED',
    status: HttpStatus.FORBIDDEN, // 403
    message: 'Bạn không có quyền thực hiện hành động này!',
    hint: 'Kiểm tra quyền truy cập hoặc liên hệ quản trị viên.',
  },

  // ⚠️ Nhóm 4 — Lỗi thiếu dữ liệu bắt buộc (null field)
  {
    match: ['not null'],
    code: 'MISSING_FIELD',
    status: HttpStatus.UNPROCESSABLE_ENTITY, // 422
    message: 'Thiếu dữ liệu bắt buộc!',
    hint: 'Đảm bảo tất cả trường cần thiết đã được điền.',
  },

  // 🔍 Nhóm 5 — Lỗi không tìm thấy dữ liệu (ID sai, record không tồn tại)
  {
    match: ['not found'],
    code: 'RESOURCE_NOT_FOUND',
    status: HttpStatus.NOT_FOUND, // 404
    message: 'Không tìm thấy tài nguyên yêu cầu!',
    hint: 'Kiểm tra lại ID hoặc URL bạn đang gọi.',
  },

  // 🧮 Nhóm 6 — Lỗi xác thực dữ liệu Sequelize (vi phạm validation rule)
  {
    match: ['SequelizeValidationError'],
    code: 'VALIDATION_ERROR',
    status: HttpStatus.UNPROCESSABLE_ENTITY, // 422
    message: 'Một số trường dữ liệu không hợp lệ!',
    hint: 'Kiểm tra lại dữ liệu gửi lên (format, độ dài, kiểu dữ liệu...).',
  },

  // 🧩 Nhóm 7 — Lỗi trùng khóa duy nhất (unique constraint)
  {
    match: ['SequelizeUniqueConstraintError'],
    code: 'DUPLICATE_VALUE',
    status: HttpStatus.CONFLICT, // 409
    message: 'Giá trị bị trùng, vui lòng nhập lại!',
    hint: 'Thử giá trị khác cho trường duy nhất.',
  },

  // 🔗 Nhóm 8 — Lỗi ràng buộc khóa ngoại (foreign key)
  {
    match: ['SequelizeForeignKeyConstraintError'],
    code: 'FOREIGN_KEY_ERROR',
    status: HttpStatus.BAD_REQUEST, // 400
    message: 'Dữ liệu liên kết không tồn tại!',
    hint: 'Kiểm tra lại ID liên kết trong cơ sở dữ liệu.',
  },

  // 💣 Nhóm 9 — Lỗi hệ thống cơ sở dữ liệu (database / ORM)
  {
    match: ['database', 'sequelize'],
    code: 'DATABASE_ERROR',
    status: HttpStatus.INTERNAL_SERVER_ERROR, // 500
    message: 'Có lỗi xảy ra khi thao tác với cơ sở dữ liệu!',
    hint: 'Thử lại sau hoặc báo cho quản trị viên.',
  },
];
