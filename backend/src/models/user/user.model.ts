import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import { sequelize } from '../../database/sequelize';
import Role from '../role/role.model';
import { AvatarPath } from '@/type/path';
import Nation from '../nation/nation.model';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>; // UUID thay cho BIGINT
  declare email: string;
  declare username: string;
  declare password: string;
  declare fullName: string;
  declare isActive: CreationOptional<boolean>;
  declare phone: CreationOptional<string | null>;
  declare dateOfBirth: CreationOptional<Date | null>;
  declare lastLogin: CreationOptional<Date | null>;
  declare gender: CreationOptional<'male' | 'female' | null>; // Giới tính chỉ có thể là 'male' hoặc 'female'
  declare roleId: CreationOptional<number | null>; // Cập nhật theo kiểu BIGINT cho role_id
  declare nationId: CreationOptional<number | null>; // Thêm trường nation_id
  declare bio: CreationOptional<string | null>;
  declare isVerified: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare twoFaEnabled: CreationOptional<boolean>; // Thêm trường 2fa_enabled
  declare title: CreationOptional<string>;
  declare avatar: CreationOptional<string>;
  // Liên kết
  declare role?: CreationOptional<Role>;
  declare nation?: CreationOptional<Nation>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    username: {
      // Thêm trường username
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      // Thêm trường password
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: { type: DataTypes.STRING(255), allowNull: false, field: 'full_name' },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
    twoFaEnabled: {
      // Thêm trường 2fa_enabled
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: '2fa_enabled',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    dateOfBirth: { type: DataTypes.DATEONLY, allowNull: true, field: 'date_of_birth' },
    lastLogin: { type: DataTypes.DATE, allowNull: true, field: 'last_login' },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        isIn: [['male', 'female']], // Kiểm tra giá trị giới tính hợp lệ
      },
      field: 'gender',
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'role_id',
    },
    nationId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'nation_id',
    },
    bio: { type: DataTypes.TEXT, allowNull: true },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_verified' },
    title: { type: DataTypes.STRING(100), allowNull: true },

    avatar: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'avatar',
      get() {
        const raw = this.getDataValue('avatar');
        if (!raw) return null;
        return `/${AvatarPath}_${this.id}/${raw}`;
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: false, // Chỉ dùng khi có cột delete_at (tự động bắt)
  }
);

export default User;
