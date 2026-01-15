import { InferAttributes, InferCreationAttributes, Optional } from 'sequelize';
import { User } from './user.model';
import { NullishPropertiesOf } from 'sequelize/types/utils';

export type UserAttributes = InferAttributes<User>;
// export type UserCreation = InferCreationAttributes<User>
// export type UserCreation = Partial<InferCreationAttributes<User>>;
export type UserCreation = Optional<InferCreationAttributes<User>, NullishPropertiesOf<InferCreationAttributes<User>>>;


export type UserUpdate = Partial<UserCreation>;

// Filter nhận để tìm user
export type FilterUser = {
  search: string; // từ khóa tìm kiếm
  pageNumber: number; // số trang hiện tại
  countNumber: number; // số lượng hiển thị trên mỗi trang
};

export type UserLogin = {
  id: string;
  email?: string | null;
  username?: string | null;
  fullName?: string | null;
  phone?: string | null;
  dateOfBirth?: Date | null;
  title?: string | null;
  avatar?: string | null;
  gender?: string | null;
  lastLogin: Date | null;
};
