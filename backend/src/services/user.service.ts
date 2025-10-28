import { UserCreation } from "../models/User";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private repo = new UserRepository()) {}

  // Đăng ký user mới
  async register(user: UserCreation) {
    const exists = await this.repo.findByEmail(user.email);
    if (exists) throw new Error("Email already exists");
    return this.repo.create(user);
  }

  // Lấy danh sách tất cả user
  list() {
    return this.repo.findAll();
  }

  // Lấy thông tin user theo id
  get(id: number) {
    return this.repo.findById(id);
  }

  // Cập nhật thông tin user theo id
  update(id: number, data: { email?: string; name?: string | null }) {
    return this.repo.update(id, data);
  }

  // Xoá user theo id
  remove(id: number) {
    return this.repo.delete(id);
  }
}
