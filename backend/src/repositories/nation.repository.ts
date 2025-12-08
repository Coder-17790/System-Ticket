import { Nation } from '@/models';

export class NationRepository {
  // Lấy danh sách Nation
  async getList() {
    return Nation.findAll();
  }
}
