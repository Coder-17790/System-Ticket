import { UserCreation, UserUpdate } from '../models/user.types';
import User from '../models/user.init';

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
