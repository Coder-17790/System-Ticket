import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../database/sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string | number>;
  declare orgId: CreationOptional<string | number | null>;
  declare email: string;
  declare fullName: string;
  declare isActive: CreationOptional<boolean>;

  declare phone: CreationOptional<string | null>;
  declare position: CreationOptional<string | null>;
  declare dateOfBirth: CreationOptional<Date | null>;
  declare lastLogin: CreationOptional<Date | null>;
  declare address: CreationOptional<string | null>;
  declare gender: CreationOptional<string | null>;
  declare role: CreationOptional<string>;
  declare avatarUrl: CreationOptional<string | null>;
  declare bio: CreationOptional<string | null>;
  declare isVerified: CreationOptional<boolean>;
  declare deletedAt: CreationOptional<Date | null>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    orgId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'org_id',
      references: { model: 'organizations', key: 'id' },
      onDelete: 'SET NULL',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'full_name',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    position: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'date_of_birth',
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login',
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'user',
    },
    avatarUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'avatar_url',
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_verified',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: true, // tự xử lý deletedAt cho soft delete
  }
);

// ===== DTO TYPES =====

export type UserAttributes = {
  id: string | number;
  orgId: string | number | null;
  email: string;
  fullName: string;
  isActive: boolean;
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
};

export type UserCreation = {
  orgId?: string | number | null;
  email: string;
  fullName: string;
  isActive?: boolean;
  phone?: string | null;
  position?: string | null;
  dateOfBirth?: Date | null;
  lastLogin?: Date | null;
  address?: string | null;
  gender?: string | null;
  role?: string;
  avatarUrl?: string | null;
  bio?: string | null;
  isVerified?: boolean;
};

export type UserUpdate = Partial<UserCreation>;
