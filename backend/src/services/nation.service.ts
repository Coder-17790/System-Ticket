import { NationRepository } from '@/repositories/nation.repository';

export class NationService {
  constructor(private repo = new NationRepository()) {}

  //Lấy danh sách tất cả Nation
  getListAll() {
    return this.repo.getList();
  }
}
