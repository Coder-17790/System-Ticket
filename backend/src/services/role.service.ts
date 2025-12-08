import { RoleRepository } from '@/repositories/role.repository';

export class RoleService {
  constructor(private repo = new RoleRepository()) {}

  //Tìm user theo tên va email
  getRole() {
    return this.repo.findAll();
  }
}
