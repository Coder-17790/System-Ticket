import { FilterUser, UserCreation, UserUpdate } from '../models/user.types';
import User from '../models/user.init';
import { Op } from 'sequelize';
import { log } from 'console';

export class UserRepository {
  async create(data: UserCreation) {
    return User.create(data);
  }

  // Tìm user theo id
  async findById(id: number) {
    return User.findByPk(id);
  }

  // Lấy tất cả user
  async findAll() {
    return User.findAll();
  }

  //  Tìm user theo email
  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  // Tìm tất cả user theo email hoặc tên, có filter
  async findByEmailAName(filter?: FilterUser) {
    if (!filter) throw new Error('Missing filter');

    const { search, pageNumber, countNumber } = filter;
    const page = pageNumber || 1;
    const count = countNumber || 10;

    if (!search?.trim()) {
      return User.findAll({
        limit: count,
        offset: (page - 1) * count,
        order: [['createdAt', 'DESC']],
      });
    }

    return User.findAll({
      where: {
        [Op.or]: [
          { email: { [Op.iLike]: `%${search}%` } },
          { fullName: { [Op.iLike]: `%${search}%` } },
        ],
      },
      limit: count,
      offset: (page - 1) * count,
      order: [['createdAt', 'DESC']],
    });
  }

  // Cập nhật user theo id
  async update(id: number, data: UserUpdate) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(data);
  }

  // Xoá user theo id
  async delete(id: number) {
    return User.destroy({ where: { id } });
  }
}
