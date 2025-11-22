import { OptionCBB } from '@/components/ui/STComboBox';

export type User = {
  id: string | number;
  orgId: string | number | null;
  email: string;
  title: string;
  fullName: string;
  isActive: boolean;
  language: string;
  phone: string | null;
  position: string | null;
  dateOfBirth: Date | null;
  lastLogin: Date | null;
  address: string | null;
  gender: string | null;
  role: string;
  avatarUrl: string | null;
  bio: string | null;
  isVerified: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
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

export const roleOption: OptionCBB[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
  { label: 'Moderator', value: 'moderator' },
];

export const positionOption: OptionCBB[] = [
  { label: 'Manager', value: 'Manager' },
  { label: 'Developer', value: 'Developer' },
  { label: 'Designer', value: 'Designer' },
  { label: 'Intern', value: 'Intern' },
];

export const languageOption: OptionCBB[] = [
  { label: 'Việt Nam', value: 'Việt Nam' },
  { label: 'Hoa Kỳ', value: 'Hoa Kỳ' },
  { label: 'Pháp', value: 'Pháp' },
  { label: 'Nhật Bản', value: 'Nhật Bản' },
  { label: 'Hàn Quốc', value: 'Hàn Quốc' },
  { label: 'Đức', value: 'Đức' },
  { label: 'Anh', value: 'Anh' },
  { label: 'Úc', value: 'Úc' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Singapore', value: 'Singapore' },
];
