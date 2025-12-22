import { HttpStatus, ResponseAPI } from '@/type'; // đường dẫn tới file type ResponseAPI
import { AvatarPath } from '@/type/path';
import utilt from '@/utils';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { UserService } from '../services/user.service';
import { UserCreation } from '@/models/user/user.types';

const service = new UserService();

export const UserController = {
  // 🧩 Tạo mới người dùng
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userCreation: UserCreation = req.body;

      const user = await service.register(userCreation);

      const response: ResponseAPI<typeof user> = {
        success: true,
        status: HttpStatus.CREATED,
        message: 'Tạo người dùng thành công',
        data: user,
      };

      // res.status(HttpStatus.CREATED).json(response);
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
        status: HttpStatus.OK,
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
        status: HttpStatus.OK,
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
      const user = await service.get(req.params.id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          status: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy người dùng',
        } as ResponseAPI);
      }

      const response: ResponseAPI<typeof user> = {
        success: true,
        status: HttpStatus.OK,
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
      const test = req.params.id;
      const updated = await service.update(req.params.id, req.body);
      if (!updated) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          status: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy người dùng để cập nhật',
        } as ResponseAPI);
      }

      const response: ResponseAPI<typeof updated> = {
        success: true,
        status: HttpStatus.OK,
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
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: 'Không tìm thấy file tải lên',
        } as ResponseAPI);
      }
      const fileUrl = `${utilt.format.genIdTime(new Date())}_${id}.jpeg`;
      const user = await service.updateAvatar(id, fileUrl);

      // Sau khi cập nhật thành công vào DB, lưu ảnh vào ổ đĩa
      const folderPath = `${AvatarPath}_${id}/`;

      // Kiểm tra forder id dc tạo chưa
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      const outputPath = path.join(folderPath, fileUrl);

      // Gắn vô vs tên dc chọn
      fs.writeFileSync(outputPath, req.file.buffer);
      const response: ResponseAPI<any> = {
        success: true,
        status: HttpStatus.OK,
        message: 'Cập nhật avatar thành công',
        data: { nameFile: fileUrl },
      };

      return res.status(200).json(response);
    } catch (e: any) {
      next(e);
    }
  },

  // 🧩 Xoá người dùng
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await service.remove(String(req.params.id));

      const response: ResponseAPI<null> = {
        success: true,
        status: HttpStatus.OK,
        message: 'Xoá người dùng thành công',
        data: null,
      };

      res.status(204).json(response);
    } catch (e) {
      next(e);
    }
  },
};
