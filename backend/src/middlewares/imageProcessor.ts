import { Request, Response, NextFunction } from 'express';
import path from 'path';
import sharp from 'sharp';

export const processAvatar = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next(new Error('No file uploaded.'));
  }

  const id = req.params.id;
  const outputPath = path.join('public/images/avatar', id + '.jpeg'); // Đặt lại tên file với định dạng .jpeg

  // Dùng sharp để chuyển đổi ảnh sang JPEG
  const file = req.file;
  sharp(file.buffer)
    .jpeg() // Chuyển đổi ảnh sang định dạng JPEG
    .toBuffer()
    .then((data) => {
      // Thêm buffer ảnh đã chuyển đổi vào request
      file.buffer = data;
      // Tiếp tục xử lý
      next();
    })
    .catch((err) => {
      next(err); // Nếu có lỗi, chuyển sang middleware xử lý lỗi
    });
};
