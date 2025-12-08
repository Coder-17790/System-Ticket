import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { User } from './user.model';

export type UserAttributes = InferAttributes<User>;
export type UserCreation = InferCreationAttributes<User>;
export type UserUpdate = Partial<UserCreation>;

// Filter nhận để tìm user
export type FilterUser = {
  search: string; // từ khóa tìm kiếm
  pageNumber: number; // số trang hiện tại
  countNumber: number; // số lượng hiển thị trên mỗi trang
};
