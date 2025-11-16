import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const service = new UserService();

export const UserController = {
  // Tạo mới người dùng
  async create(req: Request, res: Response) {
    try {
      const userCreation = req.body;
      const user = await service.register(userCreation);
      res.status(201).json(user);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  // Danh sách tất cả người dùng
  async list(_req: Request, res: Response) {
    const users = await service.list();
    res.json(users);
  },

  // Tìm người dùng theo tên hoặc email, có filter
  async findUser(req: Request, res: Response) {
    try {
      const filter = req.body; // nhận object filter từ client
      const users = await service.findUser(filter);
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Lấy thông tin chi tiết theo id
  async get(req: Request, res: Response) {
    const user = await service.get(Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  },

  // Cập nhật người dùng
  async update(req: Request, res: Response) {
    const updated = await service.update(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  },

  // Xoá người dùng
  async remove(req: Request, res: Response) {
    await service.remove(Number(req.params.id));
    res.status(204).send();
  },
};
