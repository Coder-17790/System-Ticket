import Role from '@/models/role/role.model';
import { RoleCreation, RoleUpdate } from '../models/role/role.types';

export class RoleRepository {
  // Thêm mới 1 Role
  async create(data: RoleCreation) {
    return Role.create(data);
  }

  // Tìm Role theo id
  async findById(id: number) {
    return Role.findByPk(id);
  }

  // Lấy tất cả Role
  async findAll() {
    return Role.findAll();
  }

  // Cập nhật Role theo id
  async update(id: number, data: RoleUpdate) {
    const role = await Role.findByPk(id);
    if (!role) return null;
    return role.update(data);
  }

  // Xoá Role theo id
  async delete(id: number) {
    return Role.destroy({ where: { id } });
  }
}
