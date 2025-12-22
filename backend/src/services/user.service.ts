import { log } from 'console';
import { FilterUser, UserCreation } from '../models/user/user.types';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  constructor(private repo = new UserRepository()) {}

  // Đăng ký user mới
  async register(user: UserCreation) {
    const exists = await this.repo.findByEmail(user.email);
    if (exists) throw new Error('Email already exists');
    return this.repo.create(user);
  }

  // Lấy user theo userName
  getUserLogin(userName: string) {
    return this.repo.getUserLogin(userName);
  }

  //Tìm user theo tên va email
  findUser(filter: FilterUser) {
    return this.repo.findByEmailAName(filter);
  }

  // Lấy danh sách tất cả user
  list() {
    return this.repo.findAll();
  }

  // Lấy thông tin user theo id
  get(id: string) {
    return this.repo.findById(id);
  }

  // Cập nhật thông tin user theo id
  update(id: string, data: { email?: string; name?: string | null }) {
    return this.repo.update(id, data);
  }

  // Xoá user theo id
  remove(id: string) {
    return this.repo.delete(id);
  }

  // Cập nhật avatar
  async updateAvatar(id: string, avatarUrl: string) {
    return this.repo.updateAvatar(id, avatarUrl);
  }

  // Lấy tên role dựa vào roleID
   async findRoleNameByRoleId(id: number) {
    return this.repo.findRoleNameByRoleId(id);
  }
}
