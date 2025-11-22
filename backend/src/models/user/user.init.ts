import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/sequelize';
import { User } from './user.model';

User.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
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
    language: { type: DataTypes.STRING(255), allowNull: false, field: 'language' },
    fullName: { type: DataTypes.STRING(255), allowNull: false, field: 'full_name' },
    title: { type: DataTypes.STRING(255), allowNull: false, field: 'title' },
    avatar: { type: DataTypes.TEXT, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    position: { type: DataTypes.TEXT, allowNull: true },
    dateOfBirth: { type: DataTypes.DATEONLY, allowNull: true, field: 'date_of_birth' },
    lastLogin: { type: DataTypes.DATE, allowNull: true, field: 'last_login' },
    address: { type: DataTypes.TEXT, allowNull: true },
    gender: { type: DataTypes.STRING(10), allowNull: true },
    role: { type: DataTypes.STRING(50), defaultValue: 'user' },
    avatarUrl: { type: DataTypes.TEXT, allowNull: true, field: 'avatar_url' },
    bio: { type: DataTypes.TEXT, allowNull: true },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_verified' },
    deletedAt: { type: DataTypes.DATE, allowNull: true, field: 'deleted_at' },
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
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

export default User;
