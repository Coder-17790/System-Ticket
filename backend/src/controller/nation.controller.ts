import { NationService } from '@/services/nation.sevice';
import { HttpStatus, ResponseAPI } from '@/type';
import { NextFunction, Request, Response } from 'express';

const nation = new NationService();

// Lấy danh sách tất cả Nation
export const NationController = {
  async getlist(_req: Request, res: Response, next: NextFunction) {
    try {
      const nations = await nation.getListAll();
      const response: ResponseAPI<typeof nations> = {
        success: true,
        status: HttpStatus.OK,
        message: 'Lấy danh sách quốc gia (Nation) thành công',
        data: nations,
      };
      res.json(response);
    } catch (e) {
      next(e);
    }
  },
};
