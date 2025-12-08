import { RoleService } from '@/services/role.service';
import { HttpStatus, ResponseAPI } from '@/type'; // đường dẫn tới file type ResponseAPI
import { NextFunction, Request, Response } from 'express';

const service = new RoleService();

export const RoleController = {
  // 🧩 Danh sách tất cả người dùng
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.getRole();
      const response: ResponseAPI<typeof users> = {
        success: true,
        status: HttpStatus.OK,
        message: 'Lấy danh sách role thành công',
        data: users,
      };
      res.json(response);
    } catch (e) {
      next(e);
    }
  },
};
