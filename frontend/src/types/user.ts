import { OptionCBB } from '@/components/ui/STComboBox';
import { Role } from './role';
import { Nation } from './nation';

export type User = {
  id: string; // UUID thay cho BIGINT
  orgId: number | null; // BIGINT, có thể null
  email: string;
  username: string; // Thêm trường username
  password: string; // Thêm trường password
  fullName: string;
  isActive: boolean;
  phone: string | null;
  dateOfBirth: Date | null;
  lastLogin: Date | null;
  gender: gender | null; // Giới tính chỉ có thể là 'male' hoặc 'female'
  roleId: number | null; // BIGINT cho role_id
  bio: string | null;
  isVerified: boolean;
  twoFaEnabled: boolean; // Trường 2fa_enabled
  title: string; // Tiêu đề
  nationId: number | null; // Thêm trường nation_id
  avatar: string; // Avatar
  updatedAt: Date;
  createdAt: Date;
  role: Role;
  nation: Nation;
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
