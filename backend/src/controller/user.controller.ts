import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const service = new UserService();

export const UserController = {
  async create(req: Request, res: Response) {
    try {
      const UserCreation = req.body;
      const user = await service.register(UserCreation);
      res.status(201).json(user);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  async list(_req: Request, res: Response) {
    const users = await service.list();
    res.json(users);
  },

  async get(req: Request, res: Response) {
    const user = await service.get(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  },

  async update(req: Request, res: Response) {
    const updated = await service.update(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  },

  async remove(req: Request, res: Response) {
    await service.remove(Number(req.params.id));
    res.status(204).send();
  },
};
