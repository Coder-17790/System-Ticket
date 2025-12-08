import { FilterUser, UserCreation, UserUpdate } from '../models/user/user.types';
import User from '../models/user/user.model';
import { Op } from 'sequelize';
import { log } from 'console';
import Role from '@/models/role/role.model';
import { Nation } from '@/models';

export class UserRepository {
  // Thêm mới 1 user
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
    const where = search?.trim()
      ? {
          [Op.or]: [
            { email: { [Op.iLike]: `%${search}%` } },
            { fullName: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    const result = await User.findAndCountAll({
      where,
      limit: count,
      include: [
        {
          model: Role,
          as: 'role', // Alias cho quan hệ
          // attributes: ['name'], // Lấy tên của role
          // attributes: { exclude: ['role_id'] }, // Loại bỏ trường 'role_id' từ kết quả trả về
        },
        {
          model: Nation,
          as: 'nation',
        },
      ],
      offset: (page - 1) * count,
      order: [['id', 'DESC']],
    });

    return {
      total: result.count,
      users: result.rows,
      currentPage: page,
      totalPages: Math.ceil(result.count / count),
    };
  }

  // Cập nhật user theo id
  async update(id: number, data: UserUpdate) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(data);
  }

  // Cập nhật user theo id
  async updateAvatar(id: string, avatarUrl: string) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update({ avatar: avatarUrl });
  }

  // Xoá user theo id
  async delete(id: number) {
    return User.destroy({ where: { id } });
  }

  // Lấy thông tin tên role của user
  async findRoleNameByRoleId(role_id: number) {
    const user = await User.findOne({
      where: { roleId: role_id }, // Tìm người dùng có role_id là tham số truyền vào
      include: [
        {
          model: Role,
          as: 'role', // Sử dụng alias 'roles' vì bạn đã khai báo alias như vậy
          attributes: ['name'], // Lấy tên của role
        },
      ],
    });

    console.log('object----------', user?.role?.name);

    if (!user || !user.role) return null; // Nếu không tìm thấy user hoặc role của user
    return user.role.name; // Trả về tên role của user
  }
}
