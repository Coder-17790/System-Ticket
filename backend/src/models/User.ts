import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../database/sequelize';

// Ghi chú BIGINT: với Postgres, BIGINT có thể được trả về dạng string.
// Để an toàn, mình để kiểu union string | number cho id và orgId.
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string | number>; // BIGSERIAL PK, auto-increment
  declare orgId: CreationOptional<string | number | null>; // FK nullable (ON DELETE SET NULL)
  declare email: string; // UNIQUE NOT NULL
  declare fullName: string; // NOT NULL
  declare isActive: CreationOptional<boolean>; // NOT NULL DEFAULT true

  // Timestamps (TIMESTAMPTZ DEFAULT now())
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT, // BIGSERIAL -> BIGINT + autoIncrement
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
      type: DataTypes.STRING, // VARCHAR
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    fullName: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: false,
      field: 'full_name',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
    // created_at / updated_at do Sequelize quản lý; thêm defaultValue để khớp DDL nếu cần
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
  }
);

// (Tuỳ chọn) Khai báo association nếu có model Organization:
// User.belongsTo(Organization, { foreignKey: "org_id", as: "organization" });

// ====== DTO Types (ngoài model) ======

// Khi đọc: các cột đều tồn tại; giá trị có thể null (name/orgId), nhưng cột luôn có.
export type UserAttributes = {
  id: string | number;
  orgId: string | number | null;
  email: string;
  fullName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Khi tạo: bỏ id/createdAt/updatedAt; orgId có thể null; isActive có default true (optional)
export type UserCreation = {
  orgId?: string | number | null;
  email: string;
  fullName: string;
  isActive?: boolean;
};

// Khi cập nhật: patch các field cho phép đổi (không cho đổi id và timestamps)
export type UserUpdate = Partial<{
  orgId: string | number | null;
  email: string;
  fullName: string;
  isActive: boolean;
}>;
