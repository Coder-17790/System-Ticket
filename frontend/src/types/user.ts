import { OptionCBB } from '@/components/ui/STComboBox';
import { Role } from './role';
import { Nation } from './nation';

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  fullName: string;
  isActive: boolean;
  phone: string;
  dateOfBirth: Date;
  lastLogin: Date;
  gender: gender;
  roleId: number;
  bio: string;
  isVerified: boolean;
  twoFaEnabled: boolean;
  title: string;
  nationId: number;
  avatar: string;
  updatedAt: Date;
  createdAt: Date;
  role: Role;
  nation: Nation;
};

export type UserUpdate = Partial<Omit<User, 'id' | 'email' | 'username' | 'password' | 'fullName'>>;

export type UserCreate = {
  email: string;
  username: string;
  password: string;
  fullName: string;
} & Partial<
  Omit<
    User,
    | 'id'
    | 'email'
    | 'username'
    | 'password'
    | 'fullName'
    | 'lastLogin'
    | 'updatedAt'
    | 'createdAt'
    | 'role'
    | 'nation'
  >
>;

export type UserLogin = {
  email: string;
  username: string;
  fullName: string;
  phone: string;
  dateOfBirth: Date;
  title: string;
  avatar: string;
  gender: gender;
  lastLogin: Date;
};

export type FilterUser = {
  search: string; // từ khóa tìm kiếm
  pageNumber: number; // số trang hiện tại
  countNumber: number; // số lượng hiển thị trên mỗi trang
};

export type UserGetList = {
  total: number;
  users: User[];
  currentPage: number;
  totalPages: number;
};

export type gender = 'male' | 'female';

export const genderOption: OptionCBB[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];
