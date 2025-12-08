import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResponseAPI } from '@/type'; // đường dẫn tới file type ResponseAPI
import path from 'path';
import fs from 'fs';

const service = new UserService();

export const UserController = {
  // 🧩 Tạo mới người dùng
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userCreation = req.body;
      const user = await service.register(userCreation);

      const response: ResponseAPI<typeof user> = {
        success: true,
        status: 201,
        message: 'Tạo người dùng thành công',
        data: user,
      };

      res.status(201).json(response);
    } catch (e: any) {
      next(e);
    }
  },

  // 🧩 Danh sách tất cả người dùng
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.list();
      const response: ResponseAPI<typeof users> = {
        success: true,
        status: 200,
        message: 'Lấy danh sách người dùng thành công',
        data: users,
      };
      res.json(response);
    } catch (e) {
      next(e);
    }
  },

  // 🧩 Tìm người dùng theo tên hoặc email, có filter
  async findUser(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = req.body;
      const users = await service.findUser(filter);
      const response: ResponseAPI<typeof users> = {
        success: true,
        status: 200,
        message: 'Tìm kiếm người dùng thành công',
        data: users,
      };
      res.json(response);
    } catch (e) {
      next(e);
    }
  },

  // 🧩 Lấy thông tin chi tiết theo id
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.get(Number(req.params.id));
      if (!user) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Không tìm thấy người dùng',
          data: null,
        } as ResponseAPI<null>);
      }

      const response: ResponseAPI<typeof user> = {
        success: true,
        status: 200,
        message: 'Lấy thông tin người dùng thành công',
        data: user,
      };
      res.json(response);
    } catch (e) {
      next(e);
    }
  },

  // 🧩 Cập nhật người dùng
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await service.update(Number(req.params.id), req.body);
      if (!updated) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Không tìm thấy người dùng để cập nhật',
          data: null,
        } as ResponseAPI<null>);
      }

      const response: ResponseAPI<typeof updated> = {
        success: true,
        status: 200,
        message: 'Cập nhật người dùng thành công',
        data: updated,
      };
      res.json(response);
    } catch (e) {
      next(e);
    }
  },

  // Cập nhật avatar của user
  async updateAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!req.file) {
        const response: ResponseAPI<null> = {
          success: false,
          status: 400,
          message: 'Không tìm thấy file tải lên',
          data: null,
        };
        return res.status(400).json(response);
      }

      const fileUrl = `${id}.jpeg`;

      const user = await service.updateAvatar(id, fileUrl);

      // Sau khi cập nhật thành công vào DB, lưu ảnh vào ổ đĩa
      const outputPath = path.join('public/images/avatar/', fileUrl);
      fs.writeFileSync(outputPath, req.file.buffer);

      const response: ResponseAPI<typeof user> = {
        success: true,
        status: 200,
        message: 'Cập nhật avatar thành công',
        data: user,
      };

      return res.status(200).json(response);
    } catch (e: any) {
      next(e);
    }
  },

  // 🧩 Xoá người dùng
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await service.remove(Number(req.params.id));

      const response: ResponseAPI<null> = {
        success: true,
        status: 204,
        message: 'Xoá người dùng thành công',
        data: null,
      };

      res.status(204).json(response);
    } catch (e) {
      next(e);
    }
  },
};
